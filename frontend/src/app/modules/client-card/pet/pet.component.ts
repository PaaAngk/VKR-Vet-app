import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {  Subject, takeUntil } from 'rxjs';
import { TableColumn } from 'src/app/core';
import { AnalyzesResearch, Client, Maybe, Pet, Reception } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';

@Component({
	selector: 'vet-crm-pet',
	templateUrl: './pet.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	readonly tableColumns: TableColumn[] = [
        {
            name: 'Вид приема',
            dataKey: 'receptionPurpose'
        },
        {
            name: 'Диагноз',
            dataKey: 'diagnosis'
        },
        {
            name: 'Дата',
            dataKey: 'date'
        },
        {
            name: 'Стоимость',
            dataKey: 'cost'
        }
    ];


	pet: Pet = {} as Pet;
	receptions: Reception[] = [] as Reception[];
	analyzesResearchs: AnalyzesResearch[] = [] as AnalyzesResearch[];
	activeItemIndex = 1;
	readonly receptionColumns = ['receptionPurpose', 'diagnosis', 'date', 'cost', 'actions'];
	readonly analyzesColumns = ['type', 'date', 'actions']
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private activateRoute: ActivatedRoute,
    ) {
		this.activateRoute.params.subscribe(params=>this.clientCardService.getPetDetail(params['id']));

		this.clientCardService.getPet$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((pet: Pet) => {	
			this.pet = pet;
			this.receptions = pet.receptions || [] as Reception[];
			this.analyzesResearchs = pet.analyzesResearchs || [] as AnalyzesResearch[];
		});
	}

	ngOnDestroy(): void
	{
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
   
 
	setClient(clientId : string) {
		this.clientCardService.setSelectedClient(clientId);
		this.router.navigateByUrl('client-card/detail');
	}


}



// users: readonly ClientTable[] = [
// 	{
// 		time: `10:15`,
// 		fullName: `Иванов Иван Иванович`,
// 		telephone: `89365147824`,
// 		pets: [{alias:"Пэти", kind:"Кошка"}],
// 	},
// 	{
// 		time: `11:30`,
// 		fullName: `Сидоров Сидор Сидорович`,
// 		telephone: `89365147824`,
// 		pets: [
// 			{alias:"Дог", kind:"Кошка"},
// 			{alias:"Кэт", kind:"Собака"}
// 		],
// 	}
// ];