import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { skip, Subject, takeUntil } from 'rxjs';
import { Client, Pet } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { AddPetComponent } from '../../dialog/add-pet/add-pet.component';
import { tuiWatch } from '@taiga-ui/cdk';

 

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

	private readonly dialog = this.dialogService.open<number>(
        new PolymorpheusComponent(AddPetComponent, this.injector),
        {
            dismissible: false,
            label: `Добавление питомца`,
        },
    );

    constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,

		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private activateRoute: ActivatedRoute,
    ) {
		
		activateRoute.params.subscribe(params=>this.clientCardService.setSelectedClient(params['id']));

		// Getting data 
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
   
	showDialog(): void {
        this.dialog.pipe(takeUntil(this._unsubscribeAll)).subscribe();
    }

	getPetDetail(petId: string){
		// this.clientCardService.setPet(petId);
		this.router.navigateByUrl(`client-card/pet/${petId}`);
	}

}



