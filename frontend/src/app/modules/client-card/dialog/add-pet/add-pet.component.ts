import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import { ClientCardService } from '../../client-card.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { CreatePetInput } from 'src/graphql/generated';
import { take } from 'rxjs';

const latinChars = /^[а-яА-Я ]+$/;
 
export function fullNameValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: `Только русские буквы разрешены!`,
          };
}

@Component({
  selector: 'vet-crm-add-pet',
  templateUrl: './add-pet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetComponent {
    petsKind = ["Кошка", "Собака", "Жираф"]
	
	readonly addPetForm = new FormGroup({
        DOB: new FormControl(null),
        alias: new FormControl('', [Validators.required, Validators.minLength(2)]),
        breed: new FormControl(null),
        castration: new FormControl(null),
        color: new FormControl(null),
        diagnosis: new FormControl(null),
        gender: new FormControl(null),
        kind: new FormControl(null, Validators.required),
        notes: new FormControl(null),
        nutrition: new FormControl(null),
        weight: new FormControl(null),
        clientId: new FormControl(''),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<number, number>,
        private clientCardService: ClientCardService,
    ) {}

    get hasValue(): boolean {
        return this.addPetForm.status == "VALID" ? true : false;
    }

    submit(): void {
        if (this.addPetForm.status == "VALID") {
            this.clientCardService.getSelectedClient$.pipe(take(1)).subscribe({
                next: (data) =>  this.addPetForm.value.clientId = data.id
            })
            this.clientCardService.createPet(this.addPetForm.value as CreatePetInput)
            .subscribe({
                next: () => { 
                    this.alertService.open("Питомец успешно добавлен!", {status: TuiNotification.Success}).subscribe();
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
