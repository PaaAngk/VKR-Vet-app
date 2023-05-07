import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import { TuiDay, tuiWatch } from '@taiga-ui/cdk';
import { Subject, takeUntil } from 'rxjs';
import { DateRangeParams } from '../../interfaces';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';

const latinChars = /^[а-яА-Я ]+$/;
 
export function fullNameValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: `Только русские буквы разрешены!`,
          };
}

@Component({
  selector: 'vet-crm-add-reception-dialog',
  templateUrl: './add-reception.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReceptionRecordDialogComponent {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    petsKind = ["Кошка", "Собака", "Жираф"];
    petsNutrition = ["Промышленный корм", "Натуральный корм", "Смешанный корм"];
    petId: string = '';
    dateRange!: DateRangeParams;
    workTimes = tuiCreateTimePeriods(10, 20);

	readonly addPetForm = new FormGroup({
        startTime: new FormControl(null),
        endTime: new FormControl(null),
        kind: new FormControl(null as unknown as string, Validators.required),
        date: new FormControl(TuiDay.currentLocal()),
        nutrition: new FormControl(null as unknown as string),
        weight: new FormControl(null as unknown as number),
        clientId: new FormControl(''),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        // private clientCardService: ClientCardService,
        @Inject(Router) private readonly router: Router,
        private schedulerService: SchedulerService,
        private datePipe: DatePipe,
    ) {
        console.log('init')
        this.schedulerService.getSelectedDate$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((dates) => {
            console.log(dates)
            this.dateRange = dates;
        })
        
        // if(this.context.data == 'edit'){
        //     this.clientCardService.getPet$
        //     .subscribe((pet :Pet) => {
        //         this.addPetForm.setValue({
        //             DOB: pet.DOB ? TuiDay.jsonParse( this.datePipe.transform(pet.DOB, 'yyyy-MM-dd') as string) : null,
        //             alias: pet.alias,
        //             breed: pet.breed as string,
        //             castration: pet.castration as boolean,
        //             color: pet.color as string,
        //             diagnosis: pet.diagnosis as string, 
        //             gender: pet.gender as boolean,
        //             kind: pet.kind as string,
        //             notes: pet.notes as string,
        //             nutrition: pet.nutrition as string,
        //             weight: pet.weight as number,
        //             clientId: pet.clientId as string,
        //         }); 
        //         this.petId = pet.id
        //     });
        // }
    }

    get hasValue(): boolean {
        return this.addPetForm.status == "VALID" ? true : false;
    }

    get data(): string {
        return this.context.data;
    }

    setDateStartValue(dateTime: Date){
        console.log(dateTime);
        // this.dateStart = dateTime;
    }

    submit(): void {
        // if (this.addPetForm.status == "VALID") {
        //     if(this.context.data == 'add'){
        //         this.clientCardService.getSelectedClient$.pipe(take(1)).subscribe({
        //             next: (data) =>  {
        //                 this.addPetForm.value.clientId = data.id;

        //                 this.clientCardService.createPet(this.addPetForm.value as CreatePetInput)
        //                 .subscribe({
        //                     next: (data) => { 
        //                         this.alertService.open("", {status: TuiNotification.Success, label:"Питомец успешно добавлен!"}).subscribe();
        //                         this.router.navigateByUrl(`client-card/pet/${data.data?.createPet.id}`)
        //                         this.context.completeWith(1); 
        //                     },
        //                     error: (error)  => 
        //                     {
        //                         this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe()
        //                         console.log(error)
        //                     }
        //                 })
        //             }
        //         })
        //     }
        //     else if(this.context.data == 'edit'){
        //         this.clientCardService.updatePet(this.petId,this.addPetForm.value as UpdatePetInput).subscribe({
        //             next: () => {
        //                 this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
        //                 this.context.completeWith(1); 
        //             },
        //             error: (error)  => 
        //             {
        //                 this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe();
        //                 console.log(error)
        //             }
        //         })
        //     }
        // }
    }

}
