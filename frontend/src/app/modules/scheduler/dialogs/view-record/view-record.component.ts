import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TuiTime } from '@taiga-ui/cdk';
import { Client } from 'graphql-ws';
import { Employee, ReceptionPurpose, ReceptionRecord } from 'src/graphql/generated';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'vet-crm-view-record-dialog',
  templateUrl: './view-record.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewReceptionRecordDialogComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @ViewChild('templateRecordView', { static: true }) templateRecordView!: ElementRef;
    @Input() _recordView?: Observable<ReceptionRecord>;
    currentRecord?: ReceptionRecord;
    clientView?: string;
    
    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        // private clientCardService: ClientCardService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Router) private readonly router: Router,
    ) {
    }

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
                    // console.log(this.currentRecord);
                    this.dialogs.open(this.templateRecordView, {label: 'Просмотр записи'}).subscribe({
                        next: data => {
                            console.log(data);
                        },
                        complete: () => {
                            console.log('Dialog closed');
                        },
                    });
                }
            },
        })
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
    }


	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

    deleteReceptionRecord(content: PolymorpheusContent<TuiDialogContext>):void{
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogs.open(content,{label: 'Подтвердите удаление записи:',size: 's'})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			// next: () =>{
			// 	this.clientCardService.deletePet(this.pet.id).subscribe({
			// 		next: () => {
			// 			this.alertService.open("", {status: TuiNotification.Success, label:"Питомец удален!"}).subscribe();
			// 			this.router.navigateByUrl(`client-card/client/${this.pet.clientId}`);
			// 		},
			// 		error: (err) => {
			// 			console.log(err); 
			// 			this.alertService.open("Не удалось удалить питомца", {status: TuiNotification.Error, label:"Ошибка удаления"}).subscribe();
			// 		}
			// 	})
			// 	_unsubscribeDialog.next(undefined);
			// 	_unsubscribeDialog.complete();
			// }
		});
	}


    editReceptionRecord(){
        console.log("1")
    }


}
