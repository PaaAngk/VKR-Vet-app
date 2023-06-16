import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { TableColumn } from 'src/app/core';
import { AnalyzesResearch, Client, Employee, Pet, Reception, Service } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PetDialogComponent } from '../dialog/add-pet/pet-dialog.component';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import { DynamicFilterBase } from 'src/app/shared/components/advanced-dynamic-filter';
import { ComboboxDynamicFilter, CountboxDynamicFilter, TextboxAutocompleteDynamicFilter, TextboxDynamicFilter } from 'src/app/shared/components/advanced-dynamic-filter/inputs';
import { DocumentGenerateService, FileFormat } from '../document-generate.service';
import { DocumentsToGenerate } from '../models/documentsToGenerate';

@Component({
	selector: 'vet-crm-pet',
	templateUrl: './pet.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetComponent implements OnDestroy, OnInit{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	open = false;

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

	observeDialogBox: Subject<any> = new Subject();
	documentForm$: BehaviorSubject<DynamicFilterBase<any>> = new BehaviorSubject(null as unknown as DynamicFilterBase<any>);

	listOfDocumentToGenerate: DocumentsToGenerate[] = [
		{name: 'Расписка ИП', fileName: 'Raspiska_ip'}, 
		{name: 'Эвтаназия', fileName: 'Eftanaziya'}, 
		{name: 'Согласие на стационар', fileName: 'Soglasie_na_stacionar'},
		{name: 'Первичный договор', fileName: 'Pervichnyj_dogovor'},
		{name: 'Карта для стационара', fileName: 'Karta_dlya_stacionara'},
	]

	age = '';
	pageLoader = false;

	pet: Pet = {} as Pet;
	client: Client = {} as Client;
	receptions: Reception[] = [] as Reception[];
	analyzesResearchs: AnalyzesResearch[] = [] as AnalyzesResearch[];
	employeesList: string[] = [];
	surgeryServicesList: string[] = [];
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
		private documentGenerateService: DocumentGenerateService,
		private dataPipe: DatePipe,
    ) {
		this.activateRoute.params.subscribe(params=>this.clientCardService.getPetDetail(Number(params['id'])));
		this.pageLoader = true;
		this.clientCardService.getPet$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe({
			next: (pet: Pet) => {
				if (Object.keys(pet).length !== 0){
					this.pageLoader = false;
				}
				this.pet = {...pet, receptions: [], analyzesResearchs:[]}
				this.receptions = pet.receptions || [] as Reception[];//.sort((a, b) => ( new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ) )
				this.analyzesResearchs = pet.analyzesResearchs || [] as AnalyzesResearch[];
			},
			error: () => {
				this.alertService.open(
					"Не удалось загрузить данные питомца.", 
					{status: TuiNotification.Error, label:"Питомца не существует", autoClose:5000}
				).subscribe();
				this.location.back();
			}
		});
	}

	ngOnInit(){
		this.clientCardService.getAllEmployees$.subscribe({
			next:(employees: Employee[]) => this.employeesList = employees.map(d => d.fullName)
		})
		this.clientCardService.getSurgeryServicesList$.subscribe({
			next:(services: Service[]) => this.surgeryServicesList = services.map(d => d.name||'')
		})
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

	// Generate document by documnt name
	generateDoc(docName: string){
		const dataToPrint: any = {
			...this.pet, 
			genderString: this.pet.gender ? "Мужской":"Женский", 
			formatDate: this.dataPipe.transform(this.pet.DOB,  'dd.MM.yyyy')
		}
		this._changeDetectorRef.markForCheck();
		if (docName === 'Raspiska_ip'){
			this.documentForm$.next({
				title: "Расписка ИП",
				dynamicFilterInputs: [
					new ComboboxDynamicFilter({
						key: 'employee',
						label: 'Выбор сотрудника',
						placeholder:"Начните вводить ФИО сотрудника",
						options: this.employeesList,
						required: true,
					}),
					new TextboxAutocompleteDynamicFilter({
						key: 'procedure',
						label: 'Наименование операции, процедуры',
						placeholder:"Начните вводить наименование процедуры",
						options: this.surgeryServicesList,
						required: true,
					}),
					new CountboxDynamicFilter({
						key: 'costFrom',
						label: 'Стоимость от',
						value: 0,
						inputRangeParameters : {min:0, max:500000},
					}),
					new CountboxDynamicFilter({
						key: 'costTo',
						label: 'Стоимость до',
						value: 0,
						inputRangeParameters : {min:0, max:500000},
					}),
				]
			})
			this._changeDetectorRef.markForCheck()
			this.open = true
			this.gettingDocument(docName, dataToPrint);
		}
		if (docName === 'Eftanaziya'){
			this.documentGenerateService.generateDocumentByData(docName, dataToPrint, FileFormat.pdf);
		}
		if (docName === 'Soglasie_na_stacionar'){
			this.documentForm$.next({
				title: "Согласие на стационар",
				dynamicFilterInputs: [
					new ComboboxDynamicFilter({
						key: 'employee',
						label: 'Выбор сотрудника',
						placeholder:"Начните вводить ФИО сотрудника",
						options: this.employeesList,
					}),
				]
			})
			this.open = true
			this.gettingDocument(docName, dataToPrint);
		}
		if (docName === 'Pervichnyj_dogovor'){
			this.documentGenerateService.generateDocumentByData(docName, dataToPrint, FileFormat.pdf);
		}
		if (docName === 'Karta_dlya_stacionara'){
			this.documentForm$.next({
				title: "Согласие на стационар",
				dynamicFilterInputs: [
					new ComboboxDynamicFilter({
						key: 'employee',
						label: 'Выбор сотрудника',
						placeholder:"Начните вводить ФИО сотрудника",
						options: this.employeesList,
					}),
					new TextboxDynamicFilter({
						key: 'diagnos',
						label: 'Предварительный диагноз',
					}),
				]
			})
			this.open = true
			this.gettingDocument(docName, dataToPrint);
		}
	}

	//wait for dialog send data in component and send data on server
	gettingDocument(docName: string, data: any){
		this.observeDialogBox
		.pipe(take(1))
		.subscribe({
			next: (dialogData: any) => {
				this.documentGenerateService.generateDocumentByData(docName, Object.assign(data, dialogData), FileFormat.pdf);
				this.open = false;
			}
		});
	}

	// getting data from dialog box
	dataFromDialog(reciveData: any){
		this.observeDialogBox.next(reciveData)
	}
}