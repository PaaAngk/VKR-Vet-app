import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { Client, DeleteClientGQL, Pet } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { AddPetComponent } from '../../dialog/add-pet/add-pet.component';
import { tuiWatch } from '@taiga-ui/cdk';
import { DialogClientComponent } from '../../dialog/client-dialog/client-dialog.component';

@Component({
	selector: 'vet-crm-client-detail',
	templateUrl: './client-detail.component.html',
	styleUrls: ['./client-detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	client = {} as Client;
	pets = [] as Pet[];
	activeItemIndex = 0;
	readonly petsColumns = ['alias', 'kind', 'gender', 'DOB', 'breed', 'actions']

	private readonly dialogAddPet = this.dialogService.open<number>(
        new PolymorpheusComponent(AddPetComponent, this.injector),
        {
            dismissible: false,
            label: `Добавление питомца`,
        },
    );

	private readonly dialogEditClient = this.dialogService.open<string>(
        new PolymorpheusComponent(DialogClientComponent, this.injector),
        {
			data: "edit",
            dismissible: true,
            label: `Изменение данных клиента`,
        },
    );

    constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,

		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private activateRoute: ActivatedRoute,
		private deleteClientGQL: DeleteClientGQL,
    ) {
		
		activateRoute.params.subscribe(params=>this.clientCardService.setSelectedClient(params['id']));

		// Getting clients data 
		this.clientCardService.getSelectedClient$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((client: Client) => {
			this.client = client
			this.pets = client.pets || []
		});
	}

	ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
   
	showDialogAddPet(): void {
        this.dialogAddPet.pipe(takeUntil(this._unsubscribeAll)).subscribe();
    }

	getPetDetail(petId: string){
		this.router.navigateByUrl(`client-card/pet/${petId}`);
	}

	showDialogEditClient(): void {
        this.dialogEditClient.pipe(takeUntil(this._unsubscribeAll)).subscribe();
    }

	deleteClient():void{
		this.deleteClientGQL.mutate({
			clientId: this.client.id
		}).subscribe({
			next: () => this.alertService.open("", {status: TuiNotification.Success, label:"Клиент удален!"}).subscribe(),
			error: (err) => {
				console.log(err); 
				this.alertService.open("Не удалось удалить клиента", {status: TuiNotification.Error, label:"Ошибка удаления"}).subscribe();
			}
		})
	}
}


//Сделать удаление каскад по данными клиента и обновление кеша клиентов
