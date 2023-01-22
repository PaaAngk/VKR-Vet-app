import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import { TuiValidationError, tuiWatch } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { Service, UpdateServiceInput } from 'src/graphql/generated';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServicesService } from './services.service';


@Component({
	selector: 'vet-crm-service',
	templateUrl: './services.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	services : Service[] = [] as Service[];
	filterServices : Service[] = [] as Service[];

	editedService: Service = {} as Service;
	readonly columns = [`name`, `typeName`, `price`, `actions`];

	loading = false;

	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});

	private readonly dialogAddPet = this.dialogService.open<number>(
        new PolymorpheusComponent(AddServiceComponent, this.injector),
        {
            dismissible: true,
            label: `Добавление услуги`,
        },
    );
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private servicesService: ServicesService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    ) {
		// Getting data 
		this.loading = true;
		this.servicesService.getServices$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((services: Service[]) => {	
			this.loading = false;
			this.services = services;
			this.filterServices = this.setFilterServices(this.searchForm.value['search']);
		});

		this.searchForm.valueChanges
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe({
			next: (data) => {
				this.filterServices = this.setFilterServices(data['search']);
			}
		})
	}

	ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	get computedError(): TuiValidationError | null {
        return new TuiValidationError(`An error`);
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
   
	readonly categorySorter: TuiComparator<Service> = (a, b) =>
        tuiDefaultSort(a.type.typeName, b.type.typeName);
 
    showDialog(): void {
        this.dialogAddPet.subscribe();
    }

	setFilterServices(filterValue: string | null | undefined) : Service[]{
		return this.services.filter((service:Service) =>{
			return service.name?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "") ||
			service.type.typeName?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "")
		});
	}

	setEditableService(service:Service){
		this.editedService = service;
	}

	onValueChange<K extends keyof Service>(
        value: Service[K],
        key: K,
    ): void {
		console.log(value)
		console.log(key)
		this.editedService =  {...this.editedService, [key]: value};
    }

	saveEditService(){

		this.servicesService.updateService(
			this.editedService.id, 
			{ 
				name: this.editedService.name, 
				price: this.editedService.price 
			} as UpdateServiceInput
		).subscribe({
			next: (data) => { 
				console.log(data)
				this.alertService.open(
					"", 
					{
						status: TuiNotification.Success, 
						label:"Услуга изменена",
					}
					).subscribe();
					this.editedService = {} as Service;
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Услуга уже добавлена", 
					{
						status: TuiNotification.Error, 
						label:"Ошибка обновления услуги",
						autoClose: 5000,
					}
					).subscribe()
				console.log(error)
			}
		})
	}	
}
