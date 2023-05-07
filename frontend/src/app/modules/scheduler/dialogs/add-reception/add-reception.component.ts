import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import { TuiDay, TuiTime, tuiWatch } from '@taiga-ui/cdk';
import { debounceTime, filter, Observable, startWith, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { DateRangeParams } from '../../interfaces';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { Client, Employee, ReceptionPurpose } from 'src/graphql/generated';

@Component({
  selector: 'vet-crm-add-reception-dialog',
  templateUrl: './add-reception.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReceptionRecordDialogComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    petsKind = ["Кошка", "Собака", "Жираф"];
    dateRange?: DateRangeParams;
    workTimes = tuiCreateTimePeriods(10, 20);
    workTimesEnd = tuiCreateTimePeriods(10, 20);
    employees!: Employee[];
    receptionPurposes!: ReceptionPurpose[];

    readonly search$ = new Subject<string | null>();
 
    readonly items$: Observable<readonly Client[] | null> = this.search$.pipe(
        debounceTime(500),
        filter(value => value !== null),
        switchMap(search =>
            this.clientCardService.searchClients(search).pipe(startWith<Client[]>(null)),
        ),
        startWith(null),
    );

	readonly addReceptionRecordForm = new FormGroup({
        startTime: new FormControl(null as unknown as TuiTime, Validators.required),
        endTime: new FormControl(null as unknown as TuiTime, Validators.required),
        kind: new FormControl(null as unknown as string, Validators.required),
        date: new FormControl(new Date(), Validators.required),
        employeeId: new FormControl(-1),
        purposeId: new FormControl(-1),
		employeeInput: new FormControl(null as unknown as Employee),
		visitPurposeInput: new FormControl(null as unknown as ReceptionPurpose),
        clientId: new FormControl(null as unknown as string),
        clientInput: new FormControl(null as unknown as Client),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        // private clientCardService: ClientCardService,
        @Inject(Router) private readonly router: Router,
        private schedulerService: SchedulerService,
        private clientCardService: ClientCardService,
        private datePipe: DatePipe,
    ) {
        // if(this.context.data == 'edit'){
        // }
    }

    ngOnInit(): void {
        this.schedulerService.getSelectedDate$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((dates) => {
            if (dates){
                this.dateRange = dates;
                this.addReceptionRecordForm.setValue({
                    startTime: TuiTime.fromLocalNativeDate(dates.start),
                    endTime: TuiTime.fromLocalNativeDate(dates.end),
                    kind: null,
                    date: dates.start,
                    employeeId: -1,
                    purposeId: -1,
                    employeeInput: null,
                    visitPurposeInput: null,
                    clientId: null as unknown as string,
                    clientInput: null
                })
                this.updateWorkTimeEnd(TuiTime.fromLocalNativeDate(dates.start))
            }
            else {
                this.dateRange = undefined;
            }
        })

        this.clientCardService.getAllEmployees$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((employees) => {
            this.employees = employees;
        })

        this.clientCardService.getAllReceptionPurpose$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((receptionPurposes) => {
            this.receptionPurposes = receptionPurposes;
        })

        // Set avialble end time more then start time
        this.addReceptionRecordForm.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
            if (data.startTime){
                this.updateWorkTimeEnd(data.startTime)
            }
        })
    }
    
    ngOnDestroy(): void {
        console.log("Destroy")
        this.schedulerService.setSelectedDate(undefined as unknown as DateRangeParams);
        this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
    }

    get hasValue(): boolean {
        return this.addReceptionRecordForm.status == "VALID" ? true : false;
    }

    get data(): string {
        return this.context.data;
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

    updateWorkTimeEnd(startTime: TuiTime){
        this.workTimesEnd = tuiCreateTimePeriods(
            startTime.minutes > 0 ? startTime.hours+1 : startTime.hours
            , 20);
    }

    readonly stringifyEmployeeList = (item: Employee): string => `${item.fullName}`;

	readonly stringifyPurposeList = (item: ReceptionPurpose): string => `${item.purposeName}`;

    readonly stringifyClient = (item: Client): string =>`${item.fullName}`;

    onSearchChange(searchQuery: string | null): void {
        this.search$.next(searchQuery);
    }
    
    extractValueFromEvent(event: Event): string | null {
        return (event.target as HTMLInputElement)?.value || null;
    }

    submit(): void {
        if (this.addReceptionRecordForm.status == "VALID") {
            if(this.context.data == 'add'){
                this.addReceptionRecordForm.value.clientId = this.addReceptionRecordForm.value.clientInput?.id;
                this.addReceptionRecordForm.value.employeeId = this.addReceptionRecordForm.value.employeeInput?.id;
                this.addReceptionRecordForm.value.purposeId = this.addReceptionRecordForm.value.visitPurposeInput?.id;

                console.log(this.addReceptionRecordForm.value)

                const startDate = new Date(this.addReceptionRecordForm.value.date || 0)
                const endDate = new Date(this.addReceptionRecordForm.value.date!
                    .setHours(this.addReceptionRecordForm.value.endTime?.hours || 0, this.addReceptionRecordForm.value.endTime?.minutes || 0))
                console.log(startDate)
                console.log(endDate)
                // this.schedulerService.createReceptionRecord(this.addPetForm.value as CreatePetInput)
                // .subscribe({
                //     next: (data) => { 
                //         this.alertService.open("", {status: TuiNotification.Success, label:"Питомец успешно добавлен!"}).subscribe();
                //         this.router.navigateByUrl(`client-card/pet/${data.data?.createPet.id}`)
                //         this.context.completeWith(1); 
                //     },
                //     error: (error)  => 
                //     {
                //         this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe()
                //         console.log(error)
                //     }
                // })
                    
            }
            // else if(this.context.data == 'edit'){
            //     this.clientCardService.updatePet(this.petId,this.addPetForm.value as UpdatePetInput).subscribe({
            //         next: () => {
            //             this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
            //             this.context.completeWith(1); 
            //         },
            //         error: (error)  => 
            //         {
            //             this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe();
            //             console.log(error)
            //         }
            //     })
            // }
        }
    }

}
