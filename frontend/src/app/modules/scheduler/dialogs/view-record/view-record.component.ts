import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SchedulerService } from '../../scheduler.service';
import { Observable, Subject } from 'rxjs';
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

    @Input() _recordView?: Observable<ReceptionRecord>;

    readonly addReceptionRecordForm = new FormGroup({
        startTime: new FormControl(null as unknown as TuiTime, Validators.required),
        endTime: new FormControl(null as unknown as TuiTime, Validators.required),
        kindOfAnimal: new FormControl(null as unknown as string, Validators.required),
        date: new FormControl(new Date(), Validators.required),
		employeeInput: new FormControl(null as unknown as Employee),
		visitPurposeInput: new FormControl(null as unknown as ReceptionPurpose),
        clientInput: new FormControl(null as unknown as Client),
	});

    constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        // private clientCardService: ClientCardService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Router) private readonly router: Router,
        private schedulerService: SchedulerService,
    ) {
    }

    ngOnInit(): void {
        this._recordView?.subscribe({
            next: (value) => {
                console.log(value)
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

    showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogs.open(content).subscribe();
    }


}
