import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Injector, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { SchedulerService } from '../../scheduler.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ReceptionRecord } from 'src/graphql/generated';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { AddReceptionRecordDialogComponent } from '../add-record/add-reception.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'vet-crm-view-record-dialog',
  templateUrl: './view-record.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewReceptionRecordDialogComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @ViewChild('templateRecordView', { static: true }) templateRecordView!: ElementRef;
    // Observable input record for send data andopen dialog
    @Input() _recordView?: Observable<ReceptionRecord>;

    currentRecord?: ReceptionRecord;
    clientView?: string;

    private readonly dialogEditReceptionRecord = this.dialogService.open<ReceptionRecord>(
        new PolymorpheusComponent(AddReceptionRecordDialogComponent, this.injector),
        {
			data: 'edit',
            dismissible: false,
            label: `Изменение записи на прием`,
			size:'auto',
        },
    );
    
    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(Injector) private readonly injector: Injector,
        private schedulerService: SchedulerService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        private router: Router,
    ) {
    }

    // Getting record from local list and format to view
    ngOnInit(): void {
        this._recordView?.subscribe({
            next: (value) => {
                if (value){
                    this.currentRecord = {
                        ...value, 
                        dateTimeStart: new Date(value.dateTimeStart),
                        dateTimeEnd: new Date(value.dateTimeEnd),
                    };
                    this.clientView = `${value.client?.fullName || ''} \t ${value.client?.telephoneNumber || ''}`
                    this.dialogService.open(this.templateRecordView, {label: 'Просмотр записи'})
                    .pipe(takeUntil(this._unsubscribeAll)).subscribe();
                }
            },
        })
    }
    
    ngOnDestroy(): void {
        console.log("destroy")
        this._unsubscribeAll.next(undefined);
        this._unsubscribeAll.complete();
		this._unsubscribeAll = new Subject<any>();
    }


	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

    deleteReceptionRecord(content: PolymorpheusContent<TuiDialogContext>):void{
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{label: 'Подтвердите удаление записи:',size: 's'})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.schedulerService.deleteReceptionRecord(this.currentRecord!.id).subscribe({
					next: () => {
						this.alertService.open("", {status: TuiNotification.Success, label:"Запись удалена!"}).subscribe();
                        this.ngOnDestroy();
					},
					error: (err) => {
						console.log(err); 
						this.alertService.open("Не удалось удалить запись, перезагрузите страницу", 
                            {status: TuiNotification.Error, label:"Ошибка удаления", autoClose:5000}).subscribe();
                        this.ngOnDestroy();
					}
				})
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
	}


    editReceptionRecord(){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.schedulerService.setSelectedReceptionRecord(this.currentRecord!)
        this.ngOnDestroy();
        this.dialogEditReceptionRecord.subscribe();
    }

    getClientCard(){
        this.router.navigateByUrl(`/client-card/client/${this.currentRecord?.client?.id}`)
    }

}
