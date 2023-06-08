import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import { ClientCardService } from '../../client-card.service';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { CreatePetInput, Pet, UpdatePetInput } from 'src/graphql/generated';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { DatePipe } from '@angular/common';

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
    petsKind = [
        "Кошка", 
        "Собака",
        'Коза',
        'Кролик',
        'Крыса',
        'Лошадь',
        'Птица',
        'Свинья',
        'Хомяк',
        'Хорек',
        'Экзотика'
    ];
    petsNutrition = ["Промышленный корм", "Натуральный корм", "Смешанный корм"];
    petId: number = -1;

	readonly addPetForm = new FormGroup({
        DOB: new FormControl(),
        alias: new FormControl('', [Validators.required, Validators.minLength(2)]),
        breed: new FormControl(null as unknown as string),
        castration: new FormControl(null as unknown as boolean),
        color: new FormControl(null as unknown as string),
        diagnosis: new FormControl(null as unknown as string),
        gender: new FormControl(null as unknown as boolean),
        kind: new FormControl(null as unknown as string, Validators.required),
        notes: new FormControl(null as unknown as string),
        nutrition: new FormControl(null as unknown as string),
        weight: new FormControl(null as unknown as number),
        clientId: new FormControl(-1),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        private clientCardService: ClientCardService,
        @Inject(Router) private readonly router: Router,
        private datePipe: DatePipe,
    ) {
        
        if(this.context.data == 'edit'){
            this.clientCardService.getPet$
            .subscribe((pet :Pet) => {
                this.addPetForm.setValue({
                    DOB: pet.DOB ? TuiDay.jsonParse( this.datePipe.transform(pet.DOB, 'yyyy-MM-dd') as string) : null,
                    alias: pet.alias,
                    breed: pet.breed as string,
                    castration: pet.castration as boolean,
                    color: pet.color as string,
                    diagnosis: pet.diagnosis as string, 
                    gender: pet.gender as boolean,
                    kind: pet.kind as string,
                    notes: pet.notes as string,
                    nutrition: pet.nutrition as string,
                    weight: pet.weight as number,
                    clientId: pet.clientId as number,
                }); 
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
            if(this.context.data == 'add'){
                this.clientCardService.getSelectedClient$.pipe(take(1)).subscribe({
                    next: (data) =>  {
                        this.addPetForm.value.clientId = data.id;

                        this.clientCardService.createPet(this.addPetForm.value as CreatePetInput)
                        .subscribe({
                            next: (data) => { 
                                this.alertService.open("", {status: TuiNotification.Success, label:"Питомец успешно добавлен!"}).subscribe();
                                this.router.navigateByUrl(`client-card/pet/${data.data?.createPet.id}`)
                                this.context.completeWith(1); 
                            },
                            error: (error)  => 
                            {
                                this.alertService.open("Либо питомец уже добавлен, либо нет связи с сервером. Перезагрузите страницу или обратитесь к администратору.", {
                                    status: TuiNotification.Error,
                                    autoClose: 10000,
                                    label:"Не удалось добавить питомца"
                                }).subscribe()
                                console.log(error)
                            }
                        })
                    }
                })
            }
            else if(this.context.data == 'edit'){
                this.clientCardService.updatePet(this.petId,this.addPetForm.value as UpdatePetInput).subscribe({
                    next: () => {
                        this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
                        this.context.completeWith(1); 
                    },
                    error: (error)  => 
                    {
                        this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe();
                        console.log(error)
                    }
                })
            }
        }
    }

}
