import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultEditorExtensions, TuiEditorTool, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { TuiContextWithImplicit, TuiIdentityMatcher, TuiStringHandler, tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { CreateReceptionGQL, GoodsListReceptionInput, ServiceListReceptionInput, Employee, ReceptionPurpose, CreateReceptionInput, GetReceptionGQL, Reception, UpdateReceptionInput } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown, ButtonWithDropdownItem } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';

interface SelectedService{
	readonly id: number;
    readonly name: string;
    readonly price: number;
	quantity: number;
}

interface SelectedGoods{
	readonly id: number;
    readonly name: string;
	readonly measure: string;
    readonly price: number;
	quantity: number;
}

@Component({
	selector: 'vet-crm-reception-new',
	templateUrl: './reception.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
		  provide: TUI_EDITOR_EXTENSIONS,
		  useValue: defaultEditorExtensions,
		},
	],
})
export class ReceptionComponent implements OnDestroy, OnInit {
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/** Interface */
	editMode = false;
	receptionId = '';

	activeItemIndex = 0;
	@ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;
	// open for print buttons
	readonly assignmentPrintButtonData : ButtonWithDropdown = {
		buttonName: 'Печать листа назначения',
		dropdownItems : [
			{name: "Скачать файл", event:"download"},
		],
	};
	readonly checkPrintButtonData : ButtonWithDropdown = {
		buttonName: 'Печать чека',
		dropdownItems : [
			{name: "Скачать файл", event:"download"},
		],
	};
	loading = false;

	petId = '';
	readonly tablesColumns = ['name', 'price', 'quantity', 'actions'];
	employeeList : Array<Employee> = [];
	purposeList : Array<ReceptionPurpose> = [];

	servicesList : Array<any> = []; // any for work with universal component by her interface
	selectedServices : SelectedService[] = [];
	selectServiceInput : SelectedService[] = [];
	goodsList : Array<any> = []; // any for work with universal component by her interface
	selectedGoods : SelectedGoods[] = [];
	selectGoodsInput : SelectedGoods[] = [];

	editorSettengs: ReadonlyArray<TuiEditorTool> = [TuiEditorTool.Undo, TuiEditorTool.Bold, TuiEditorTool.Italic, TuiEditorTool.Underline, TuiEditorTool.List,
		TuiEditorTool.Color, TuiEditorTool.Size, TuiEditorTool.Sup, TuiEditorTool.Sub, TuiEditorTool.HR, TuiEditorTool.Link, TuiEditorTool.Hilite]
	
	readonly addReceptionForm = new FormGroup({
        employeeId: new FormControl(-1),
        purposeId: new FormControl(-1),
        anamnesis: new FormControl(''),
		clinicalSigns: new FormControl(''),
		diagnosis: new FormControl(''),
		assignment: new FormControl(''),
		cost: new FormControl(0),
		employeeInput: new FormControl(null as unknown as Employee, [Validators.required]),
		visitPurposeInput: new FormControl(null as unknown as ReceptionPurpose, [Validators.required]),
	});

    constructor(
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activateRoute: ActivatedRoute,
		private createReceptionGQL : CreateReceptionGQL,
		private getReceptionGQL : GetReceptionGQL,
    ) {
		
	}

	ngOnInit(): void {
		this.clientCardService.getServiceTypes$
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe(data => {
			this.servicesList = data;
		});

		this.clientCardService.getGoodsCategories$
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe(data => {
			this.goodsList = data;
		});

		this.clientCardService.getAllEmployees$
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe(data => {
			this.employeeList = data;
		});

		this.clientCardService.getAllReceptionPurpose$
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe(data => {
			this.purposeList = data;
		});

		// Getting id pet from url for now reception
		this.activateRoute.params.subscribe(params=> this.petId=params['id'] );

		// getting reception data for edit and fill current form
		if (this.activateRoute.snapshot.url[4] && this.activateRoute.snapshot.url[4].path == 'edit'){
			this.editMode = true;
			this.receptionId = this.activateRoute.snapshot.url[3].path;
			this.getReceptionGQL
			.watch({
				receptionId: this.receptionId
			})
			.valueChanges
			.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
			.subscribe( ({data, loading}) => {
				this.loading = loading;
				console.log(data)
				const reception : Reception = data.reception
				this.addReceptionForm.setValue({
					employeeId: -1,
					purposeId: -1,
					anamnesis: reception.anamnesis as string,
					clinicalSigns: reception.clinicalSigns as string,
					diagnosis: reception.diagnosis as string,
					assignment: reception.assignment as string,
					cost: reception.cost as number,
					employeeInput: reception.employee as Employee,
					visitPurposeInput: reception.purpose as ReceptionPurpose,
				});
				this.selectGoodsInput = reception.goods?.map(goodsItem => ({...goodsItem?.goods, quantity: goodsItem?.quantity} ) )as SelectedGoods[]
				this.selectedGoods = this.selectGoodsInput;

				this.selectedServices = reception.services?.map(serviceItem => ({...serviceItem?.service, quantity: serviceItem?.quantity} ) )as SelectedService[]
				this.selectServiceInput = this.selectedServices
			});
		}
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
   
	get check(): number {
		// При выборе флакона необходимо указывать количество использованных миллилитров, с условием: 
		// при использовании 0.5 мл и меньше стоимость – половина стоимости за мл, 
		// больше 0.5 мл – полная стоимость мл
		const selectedGoods = Object.keys(this.selectedGoods).reduce( (sum, currentValue)=> {
			const good = this.selectedGoods[parseInt(currentValue)];

			let setQuantity = 0;
			const mod = Math.round((good.quantity % 1) * 10)
			switch (good.measure) {
				case 'амп':
				case 'мл':
					if ( mod > 0 && mod < 5) setQuantity = Math.round(good.quantity) + 0.5 
					else if(mod >= 5 && mod < 10) setQuantity = Math.round(good.quantity)
					else setQuantity = good.quantity
					break;
			
				default:
					setQuantity = good.quantity
					break;
			}
			
			const result : number = sum + (good.price * setQuantity)
			return result
		}, 0)

		const selectedServices = Object.keys(this.selectedServices).reduce( (sum, currentValue)=> {
			const result : number = sum + (this.selectedServices[parseInt(currentValue)].price * this.selectedServices[parseInt(currentValue)].quantity)
			return result
		}, 0)

		return Math.round( (selectedGoods + selectedServices) * 100 ) / 100
	}

	readonly identityMatcher: TuiIdentityMatcher<readonly string[]> = (items1, items2) =>
	items1.length === items2.length && items1.every(item => items2.includes(item));

	readonly valueContentService: TuiStringHandler<TuiContextWithImplicit<readonly any[]>> =
		({$implicit}) => {
			this.selectService([...$implicit]);
			if (!$implicit.length) {
				return `Ничего не выбрано`;
			}
			return `Выбрано: ${$implicit.length}`;
		};

	readonly valueContentGoods: TuiStringHandler<TuiContextWithImplicit<readonly any[]>> =
		({$implicit}) => {
			this.selectGoods([...$implicit]);
			if (!$implicit.length) {
				return `Ничего не выбрано`;
			}
			return `Выбрано: ${$implicit.length}`;
		};

	// Adding into table selected service data from input
	selectService(service: any[]){
		this.selectedServices = this.selectedServices.filter(item => service.some(s => s.id == item.id));
		const added_item = service.filter(item => !this.selectedServices.some(s => s.id == item.id));
		if(added_item.length > 0){
			this.selectedServices.push( {...added_item[0], quantity : 1} );
		}
		this._changeDetectorRef.detectChanges();
	}

	// Adding into table selected goods data from input
	selectGoods(goods: any[]){
		this.selectedGoods = this.selectedGoods.filter(item => goods.some(s => s.id == item.id));
		const added_item = goods.filter(item => !this.selectedGoods.some(s => s.id == item.id));
		if(added_item.length > 0){
			this.selectedGoods.push( {...added_item[0], quantity : 1} );
		}
		this._changeDetectorRef.detectChanges();
	}

	deleteService(service: SelectedService){
		this.selectServiceInput = this.selectServiceInput.filter(item => item.id !== service.id);
		this.selectedServices = this.selectedServices.filter(item => item.id !== service.id);
		this._changeDetectorRef.detectChanges();
	}

	deleteGoods(goods: SelectedGoods){
		this.selectGoodsInput = this.selectGoodsInput.filter(item => item.id !== goods.id);
		this.selectedGoods = this.selectedGoods.filter(item => item.id !== goods.id);
		this._changeDetectorRef.detectChanges();
	}

	readonly stringifyEmployeeList = (item: Employee): string => `${item.fullName}`;

	readonly stringifyPurposeList = (item: ReceptionPurpose): string => `${item.purposeName}`;

	assignmentPrint(){
		console.log("data")
	}
	assignmentDownload($event : ButtonWithDropdownItem){
		console.log($event)
	}

	get hasValue(): boolean {
        return this.addReceptionForm.status == "VALID" ? true : false;
    }

	submitReception(){
		if (this.addReceptionForm.status == "VALID"){
			this.loading = true;
			this.addReceptionForm.value.cost = this.check;
			
			const goodsListReceptionInput : GoodsListReceptionInput[] = this.selectedGoods.map( (goods : SelectedGoods) => (
				{ goodsId : goods.id, quantity: goods.quantity} as GoodsListReceptionInput
			));

			const serviceListReceptionInput : ServiceListReceptionInput[] = this.selectedServices.map( (service : SelectedService) => (
				{ serviceId : service.id, quantity: service.quantity} as ServiceListReceptionInput
			));

			this.addReceptionForm.value.employeeId = this.addReceptionForm.value.employeeInput?.id
			this.addReceptionForm.value.purposeId = this.addReceptionForm.value.visitPurposeInput?.id

			delete this.addReceptionForm.value['employeeInput'];
			delete this.addReceptionForm.value['visitPurposeInput'];
			
            if(this.editMode) this.editReception(goodsListReceptionInput, serviceListReceptionInput)
			else this.createReception(goodsListReceptionInput, serviceListReceptionInput)
		}
	}

	createReception(goodsListReceptionInput: GoodsListReceptionInput[], serviceListReceptionInput: ServiceListReceptionInput[]){
		this.createReceptionGQL.mutate({
			data: { ...this.addReceptionForm.value, goodsListReceptionInput, serviceListReceptionInput, petId: this.petId } as CreateReceptionInput
		})
		.subscribe({
			next: (data) => {
				this.loading = false;
				this.alertService.open("", {
					status: TuiNotification.Success, 
					label:"Прием успешно добавлен!",
					autoClose: 5000,
				}).subscribe();
				this.router.navigate([`../${data.data?.createReception.id}`], {relativeTo: this.activateRoute})
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Проверьте правильность введенных данных", 
					{
						status: TuiNotification.Error, 
						label: "Невозможно добавить прием!",
						autoClose: 5000,
					}).subscribe()
				console.log(error)
			}
		})
	}

	editReception(goodsListReceptionInput: GoodsListReceptionInput[], serviceListReceptionInput: ServiceListReceptionInput[]){
		this.clientCardService.updateReception(
			this.receptionId,
			{ ...this.addReceptionForm.value, goodsListReceptionInput, serviceListReceptionInput } as UpdateReceptionInput
		).subscribe({
			next: (data) => {
				this.loading = false;
				console.log(data)
				// this.alertService.open("", {
				// 	status: TuiNotification.Success, 
				// 	label:"Прием успешно добавлен!",
				// 	autoClose: 5000,
				// }).subscribe();
				// this.router.navigate([`../${data.data?.createReception.id}`], {relativeTo: this.activateRoute})
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Проверьте правильность введенных данных", 
					{
						status: TuiNotification.Error, 
						label: "Невозможно изменить прием!",
						autoClose: 5000,
					}).subscribe()
				console.log(error)
			}
		})
	}
}