import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { CreateWorkScheduleInput, Employee } from 'src/graphql/generated';
import { WorkScheduleService } from '../../work-schedule.service';
@Component({
  selector: 'vet-crm-add-workSchedule-dialog',
  templateUrl: './add-workSchedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkScheduleDialogComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    employees!: Employee[];
    recordID!: number;
    loading = false;

    readonly search$ = new Subject<string | null>();

	readonly addWorkScheduleForm = new FormGroup({
        workDays: new FormControl(30, Validators.required),
        date: new FormControl(new Date(), Validators.required),
        employeeId: new FormControl(null as unknown as number),
		employeeInput: new FormControl(null as unknown as Employee, Validators.required),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        private clientCardService: ClientCardService,
        private workScheduleService: WorkScheduleService,
    ) {
    }

    // Format geeted dates or record data to formcontrol 
    ngOnInit(): void {

        this.clientCardService.getAllEmployees$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((employees) => {
            this.employees = employees;
        })
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
    }

    get hasValue(): boolean {
        return this.addWorkScheduleForm.status == "VALID" ? true : false;
    }

    get data(): string {
        return this.context.data;
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------


    readonly stringifyEmployeeList = (item: Employee): string => `${item.fullName}`;


    submit(): void {
        if (this.addWorkScheduleForm.status == "VALID") {
            this.loading = true

            const reqData: CreateWorkScheduleInput = {
                dateWorkStart: this.addWorkScheduleForm.value.date,
                employeeId: Number(this.addWorkScheduleForm.value.employeeInput?.id) || -1,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                workDays: Number(this.addWorkScheduleForm.value.workDays!)
            } 
            
            this.workScheduleService.createReceptionRecord(reqData)
            .subscribe({
                next: () => { 
                    this.alertService.open("", {status: TuiNotification.Success, label:"График успешно добавлен!"}).subscribe();
                    this.context.completeWith(1); 
                    this.loading = false;
                },
                error: (error)  => {
                    this.alertService.open("Обновите страницу или обратитесь к администратору", 
                        {status: TuiNotification.Error, label:"Не удалось добавить записи в график работы", autoClose:5000}).subscribe()
                    console.log(error)
                    this.loading = false;
                }
            })                
        }
    }
}
