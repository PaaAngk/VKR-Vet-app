import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import { TuiValidationError, tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { delay, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core';
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
	columns = [`name`, `typeName`, `price`, `actions`];

	loading = false;
	currentUserRole = '';

	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});

	private readonly dialogAddPet = this.dialogService.open<number>(
        new PolymorpheusComponent(AddServiceComponent, this.injector),
        {
            dismissible: false,
            label: `Добавление услуги`,
        },
    );
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private servicesService: ServicesService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
		private userService: UserService,
    ) {
		// Getting data 
		this.loading = true;
		this.servicesService.getServices$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((services: Service[]) => {
			if(services.length>0){
				this.loading = false;
				this.services = services;
				this.filterServices = this.setFilterServices(this.searchForm.value['search']);
			}
		});

		this.searchForm.valueChanges
		.pipe(takeUntil(this._unsubscribeAll), delay(200))
		.subscribe({
			next: (data) => {
				this.filterServices = this.setFilterServices(data['search']);
				this._changeDetectorRef.markForCheck();
			}
		});
		this.currentUserRole = this.userService.getCurrentUser().role
		if( this.currentUserRole === "DOCTOR" || this.currentUserRole === "MANAGER") this.columns = [`name`, `typeName`, `price`]
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
        tuiDefaultSort(a.type?.typeName, b.type?.typeName);
 
    showDialog(): void {
        this.dialogAddPet.subscribe();
    }

	setFilterServices(filterValue: string | null | undefined) : Service[]{
		return this.services.filter((service:Service) =>{
			return service.name?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "") ||
			service.type?.typeName?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "")
		});
	}

	setEditableService(service:Service){
		this.editedService = service;
	}


	onValueChange<K extends keyof Service>(
        value: Service[K],
        key: K,
    ): void {
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
			next: () => { 
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
					"Услуга уже добавлена. Попробуйте перезагрузить страницу.", 
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

	deleteEditService(){
		this.editedService = {} as Service;
	}

	deleteService(service : Service, content: PolymorpheusContent<TuiDialogContext>){
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{
			label: 'Подтвердите удаление товара - '+ service.name,
			size: 's',
		})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
				this.servicesService.deleteService(
					service.id
				).subscribe({
					next: () => { 
						this.alertService.open(
							service.name, 
							{
								status: TuiNotification.Success, 
								label:"Услуга успешно удалена",
							}
							).subscribe();
							this.editedService = {} as Service;
					},
					error: (error)  => 
					{
						this.alertService.open(
							"Попробуйте перезагрузить страницу или обратитесь к администратору", 
							{
								status: TuiNotification.Error, 
								label:"Ошибка удаления услуги",
								autoClose: 5000,
							}
							).subscribe()
						console.log(error)
					}
				})
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
	}
}
