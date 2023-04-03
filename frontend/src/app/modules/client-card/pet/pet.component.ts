import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {  Subject, takeUntil } from 'rxjs';
import { TableColumn } from 'src/app/core';
import { AnalyzesResearch, Pet, Reception } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import {PolymorpheusComponent, PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { PetDialogComponent } from '../dialog/add-pet/pet-dialog.component';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';

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

	private readonly dialogEditPet = this.dialogService.open<string>(
        new PolymorpheusComponent(PetDialogComponent, this.injector),
        {
			data: "edit",
            dismissible: false,
            label: `Изменение данных питомца`,
        },
    );
	
	pageLoader = false;

	pet: Pet = {} as Pet;
	receptions: Reception[] = [] as Reception[];
	analyzesResearchs: AnalyzesResearch[] = [] as AnalyzesResearch[];
	activeItemIndex = 1;
	readonly receptionColumns = ['receptionPurpose', 'diagnosis', 'date', 'cost', 'actions'];
	readonly analyzesColumns = ['type', 'date', 'actions']
	readonly createdDateSorter: TuiComparator<Reception> = (a: Reception, b: Reception) => tuiDefaultSort(a.createdAt, b.createdAt)
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activateRoute: ActivatedRoute,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private location: Location,
    ) {
		this.activateRoute.params.subscribe(params=>this.clientCardService.getPetDetail(params['id']));
		this.pageLoader = true;
		this.clientCardService.getPet$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe({
			next: (pet: Pet) => {	
				if (Object.keys(pet).length !== 0){
					this.pageLoader = false;
				}
				this.pet = pet
				this.receptions = pet.receptions || [] as Reception[];//.sort((a, b) => ( new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ) )
				this.analyzesResearchs = pet.analyzesResearchs || [] as AnalyzesResearch[];
			},
			error: () => {
				this.alertService.open(
					"Не удалось загрузить данные питомца.", 
					{status: TuiNotification.Error, label:"Питомца не существует", autoClose:8000}
				).subscribe();
				this.location.back();
			}
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
   

	showDialogEditPet(){
		this.dialogEditPet.pipe(takeUntil(this._unsubscribeAll)).subscribe();
	}

	deletePet(content: PolymorpheusContent<TuiDialogContext>):void{
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{label: 'Подтвердите удаление питомца:',size: 's'})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
				this.clientCardService.deletePet(this.pet.id).subscribe({
					next: () => {
						this.alertService.open("", {status: TuiNotification.Success, label:"Питомец удален!"}).subscribe();
						this.router.navigateByUrl(`client-card/client/${this.pet.clientId}`);
					},
					error: (err) => {
						console.log(err); 
						this.alertService.open("Не удалось удалить питомца", {status: TuiNotification.Error, label:"Ошибка удаления"}).subscribe();
					}
				})
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
	}
}