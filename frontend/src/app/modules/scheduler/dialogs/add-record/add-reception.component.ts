import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import { TuiTime } from '@taiga-ui/cdk';
import { debounceTime, filter, map, Observable, startWith, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { Client, CreateReceptionRecordInput, Employee, ReceptionPurpose, ReceptionRecord, BetweenDateInput, UpdateReceptionRecordInput } from 'src/graphql/generated';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { DialogClientComponent } from 'src/app/modules/client-card/dialog/client-dialog/client-dialog.component';

class ClientView{
    constructor(
        readonly fullName: string,
        readonly telephoneNumber: string,
        readonly id: string,
        readonly address?: string,
    ){}

    toString(): string {
        return `${this.fullName} ${this.telephoneNumber}`;
    }
}

@Component({
  selector: 'vet-crm-add-reception-dialog',
  templateUrl: './add-reception.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReceptionRecordDialogComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    petsKind = ["Кошка", "Собака", "Жираф"];
    dateRange?: BetweenDateInput;
    workTimes = tuiCreateTimePeriods(10, 20);
    workTimesEnd = tuiCreateTimePeriods(10, 20);
    employees!: Employee[];
    receptionPurposes!: ReceptionPurpose[];
    recordID!: number;
    loading = false;

    readonly search$ = new Subject<string | null>();
 
    // ClientView for stringyfy choisen value in dropdown.
    readonly items$: Observable<readonly ClientView[] | null> = this.search$.pipe(
        debounceTime(500),
        filter(value => value !== null),
        switchMap(search =>
            this.clientCardService.searchClients(search).pipe(
                map(item => item?.map((i: Client) =>     
                    new ClientView(
                        i.fullName,
                        i.telephoneNumber,
                        i.id,
                        i.address||"")
                )),
                startWith<ClientView[]>(null),
                ),
        ),
        startWith(null),
    );

    private readonly dialogAddClient = this.dialogService.open<Client>(
        new PolymorpheusComponent(DialogClientComponent, this.injector),
        {
			data: "add",
            dismissible: false,
            label: `Добавление клиента`,
        },
    );

	readonly addReceptionRecordForm = new FormGroup({
        startTime: new FormControl(null as unknown as TuiTime, Validators.required),
        endTime: new FormControl(null as unknown as TuiTime, Validators.required),
        kindOfAnimal: new FormControl(null as unknown as string, Validators.required),
        date: new FormControl(new Date(), Validators.required),
        employeeId: new FormControl(null as unknown as number),
        receptionPurposeId: new FormControl(null as unknown as number),
		employeeInput: new FormControl(null as unknown as Employee),
		visitPurposeInput: new FormControl(null as unknown as ReceptionPurpose),
        clientId: new FormControl(null as unknown as string),
        clientInput: new FormControl(null as unknown as ClientView),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        // private clientCardService: ClientCardService,
        private schedulerService: SchedulerService,
        private clientCardService: ClientCardService,
    ) {
    }

    // Format geeted dates or record data to formcontrol 
    ngOnInit(): void {
        this.schedulerService.getSelectedDate$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) => {
            if (data){
                this.dateRange = {dateEnd:data.dateTimeEnd,dateStart:data.dateTimeStart};
                console.log(data)
                if(this.context.data == 'add'){
                    this.addReceptionRecordForm.patchValue({
                        startTime: TuiTime.fromLocalNativeDate(data.dateTimeStart) || null,
                        endTime: TuiTime.fromLocalNativeDate(data.dateTimeEnd),
                        date: data.dateTimeStart,
                    })
                }
                else if(this.context.data == 'edit') {
                    this.recordID = data.id
                    this.addReceptionRecordForm.patchValue({
                        startTime: TuiTime.fromLocalNativeDate(data.dateTimeStart) || null,
                        endTime: TuiTime.fromLocalNativeDate(data.dateTimeEnd),
                        kindOfAnimal: data.kindOfAnimal || '',
                        date: data.dateTimeStart,
                        employeeInput: data.employee || null,
                        visitPurposeInput: data.purpose || null,
                        clientInput: data.client as ClientView  || null
                    })
                }
                this.updateWorkTimeEnd(TuiTime.fromLocalNativeDate(data.dateTimeStart))
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
        // console.log("Destroy")
        this.schedulerService.setSelectedReceptionRecord(undefined as unknown as ReceptionRecord);
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
            this.loading = true
            // Adding record. improve date from TuiDate to native, delete not needed items

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dateTimeStart = new Date(this.addReceptionRecordForm.value.date!.setHours(
                this.addReceptionRecordForm.value.startTime?.hours || 0, this.addReceptionRecordForm.value.startTime?.minutes || 0))

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const dateTimeEnd = new Date(this.addReceptionRecordForm.value.date!.setHours(
                this.addReceptionRecordForm.value.endTime?.hours || 0, this.addReceptionRecordForm.value.endTime?.minutes || 0))

            const reqData: CreateReceptionRecordInput = {
                dateTimeStart,
                dateTimeEnd,
                clientId: this.addReceptionRecordForm.value.clientInput?.id || null,
                employeeId: this.addReceptionRecordForm.value.employeeInput?.id || null,
                kindOfAnimal: this.addReceptionRecordForm.value.kindOfAnimal,
                receptionPurposeId: this.addReceptionRecordForm.value.visitPurposeInput?.id || null,
            } 
            if(dateTimeStart<=dateTimeEnd && dateTimeStart.getHours() > 10){
                if(this.context.data == 'add'){
                    this.schedulerService.createReceptionRecord(reqData as CreateReceptionRecordInput)
                    .subscribe({
                        next: () => { 
                            this.alertService.open("", {status: TuiNotification.Success, label:"Запись на прием успешно добавлена!"}).subscribe();
                            this.context.completeWith(1); 
                            this.loading = false;
                        },
                        error: (error)  => {
                            this.alertService.open("Обновите страницу или обратитесь к администратору", 
                                {status: TuiNotification.Error, label:"Не удалось добавить запись на прием", autoClose:5000}).subscribe()
                            console.log(error)
                            this.loading = false;
                        }
                    })
                }
                else if(this.context.data == 'edit'){
                    this.schedulerService.updateReceptionRecord(this.recordID, reqData as UpdateReceptionRecordInput).subscribe({
                        next: () => {
                            this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
                            this.context.completeWith(1); 
                            this.loading = false;
                        },
                        error: (error)  => 
                        {
                            this.alertService.open("Обновите страницу или обратитесь к администратору", 
                                {status: TuiNotification.Error, label:"Не удалось обновить запись на прием", autoClose:5000}).subscribe();
                            console.log(error)
                            this.loading = false;
                        }
                    })
                }
            }
            else{
                this.alertService.open("Время начала должно быть меньшне окончания", 
                                {status: TuiNotification.Error, label:"Неправильный ввод", autoClose:5000}).subscribe();
                this.loading = false;
            }
        }
    }

    // Добавление клиента и установка в поле client input
    addClient(){
        this.dialogAddClient.subscribe({
            next: data => {
                console.log(data);
                this.addReceptionRecordForm.patchValue({
                    clientInput: new ClientView(
                        data.fullName,
                        data.telephoneNumber,
                        data.id,
                        data.address || ""
                    ),
                })
                
            },
            complete: () => {
                console.log('Dialog closed');
            },
        });
    }

}
