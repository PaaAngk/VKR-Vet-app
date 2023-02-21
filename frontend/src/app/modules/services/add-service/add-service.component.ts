import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { CreateServiceInput, ServiceType } from 'src/graphql/generated';
import { ServicesService } from '../services.service';

@Component({
  selector: 'vet-crm-add-service',
  templateUrl: './add-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    serviceTypesList : ServiceType[] = [];
	
	readonly addServiceForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
		typeId: new FormControl(null as unknown as number),
		price: new FormControl(0, [Validators.required]),
        type: new FormControl(null as unknown as ServiceType, [Validators.required]),
	});

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, number>,
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        private servicesService: ServicesService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.servicesService.getServiceTypes$
        .pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
        .subscribe({
            next: (data) => {
                this.serviceTypesList = data;
            }
        })
    }

    ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

    get hasValue(): boolean {
        return this.addServiceForm.status == "VALID" ? true : false;
    }

    get data(): number {
        return this.context.data;
    }

    readonly stringifyServices = (item: ServiceType): string => `${item.typeName}`;


    submit(): void {
        if (this.addServiceForm.status == "VALID") {
            this.addServiceForm.value.typeId = this.addServiceForm.value.type?.id
            delete this.addServiceForm.value.type

            this.servicesService.createService(this.addServiceForm.value as CreateServiceInput).subscribe({
                next: () => { 
                    this.alertService.open(
                        "", 
                        {status: TuiNotification.Success, label:"Услуга добавлена"}
                        ).subscribe({});
                    this.context.completeWith(this.addServiceForm.value); 
                },
                error: (error)  => 
                {
                    this.alertService.open(
                        "Услуга уже добавлена", 
                        {status: TuiNotification.Error, label:"Ошибка добавления услуги"}
                        ).subscribe({})
                    console.log(error)
                }
            })
        }
    }
}
