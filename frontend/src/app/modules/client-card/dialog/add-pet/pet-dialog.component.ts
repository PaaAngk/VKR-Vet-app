import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import { ClientCardService } from '../../client-card.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { CreatePetInput, Pet } from 'src/graphql/generated';
import { take } from 'rxjs';
import { Router } from '@angular/router';

const latinChars = /^[а-яА-Я ]+$/;
 
export function fullNameValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: `Только русские буквы разрешены!`,
          };
}

@Component({
  selector: 'vet-crm-pet-dialog',
  templateUrl: './pet-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetDialogComponent {
    petsKind = ["Кошка", "Собака", "Жираф"]
    petId:string = '';
	
	readonly addPetForm = new FormGroup({
        DOB: new FormControl(null as unknown as String),
        alias: new FormControl('', [Validators.required, Validators.minLength(2)]),
        breed: new FormControl(null as unknown as String),
        castration: new FormControl(null as unknown as boolean),
        color: new FormControl(null as unknown as String),
        diagnosis: new FormControl(null as unknown as String),
        gender: new FormControl(null as unknown as boolean),
        kind: new FormControl(null as unknown as String, Validators.required),
        notes: new FormControl(null as unknown as String),
        nutrition: new FormControl(null as unknown as String),
        weight: new FormControl(null as unknown as number),
        clientId: new FormControl(''),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        private clientCardService: ClientCardService,
        private router: Router,
    ) {
        if(this.context.data == 'edit'){
            this.clientCardService.getPet$
            .subscribe((pet :Pet) => {
                this.addPetForm.setValue({
                    DOB: pet.DOB as String,
                    alias: pet.alias,
                    breed: pet.breed as String,
                    castration: pet.castration as boolean,
                    color: pet.color as String,
                    diagnosis: pet.diagnosis as String, 
                    gender: pet.gender as boolean,
                    kind: pet.kind as String,
                    notes: pet.notes as String,
                    nutrition: pet.nutrition as String,
                    weight: pet.weight as number,
                    clientId: pet.id,
                }); 
                console.log(pet.castration)
                this.petId = pet.id
            });
        }
    }

    get hasValue(): boolean {
        return this.addPetForm.status == "VALID" ? true : false;
    }

    get data(): string {
        return this.context.data;
    }

    submit(): void {
        if (this.addPetForm.status == "VALID") {
            this.clientCardService.getSelectedClient$.pipe(take(1)).subscribe({
                next: (data) =>  this.addPetForm.value.clientId = data.id
            })
            this.clientCardService.createPet(this.addPetForm.value as CreatePetInput)
            .subscribe({
                next: (data) => { 
                    this.alertService.open("", {status: TuiNotification.Success, label:"Питомец успешно добавлен!"}).subscribe();
                    this.router.navigateByUrl(`client-card/pet/${data.data?.createPet.id}`)
                    this.context.completeWith(1); 
                },
                error: (error)  => 
                {
                    this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe()
                    console.log(error)
                }
            })
        }
    }

}
