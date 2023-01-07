import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defaultEditorExtensions, TuiEditorTool, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { TuiContextWithImplicit, TuiIdentityMatcher, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CreateReceptionGQL, Employee,  Pet, ReceptionPurpose } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { TUI_ARROW } from '@taiga-ui/kit';

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
	selector: 'vet-crm-reception',
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
	activeItemIndex = 1;
	@ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;
	// open for print buttons
	openAssignment = false;
	openCheck = false;

	pet: Pet = {} as Pet;
	readonly receptionColumns = ['receptionPurpose', 'diagnosis', 'date', 'cost', 'actions'];
	readonly servicesColumns = ['name', 'price', 'quantity', 'actions'];
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
        employee: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        purpose: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        anamnesis: new FormControl(''),
		clinicalSigns: new FormControl(''),
		diagnosis: new FormControl(''),
		assignment: new FormControl(''),
	});

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private createReceptionGQL : CreateReceptionGQL,
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
		return Object.keys(this.selectedGoods).reduce( (sum, currentValue)=> {
			const result : number = sum + (this.selectedGoods[parseInt(currentValue)].price * this.selectedGoods[parseInt(currentValue)].quantity)
			return result
		}, 0) 
		+ 
		Object.keys(this.selectedServices).reduce( (sum, currentValue)=> {
			const result : number = sum + (this.selectedServices[parseInt(currentValue)].price * this.selectedServices[parseInt(currentValue)].quantity)
			return result
		}, 0)
	}

	setClient(clientId : string) {
		this.clientCardService.setSelectedClient(clientId);
		this.router.navigateByUrl('client-card/detail');
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

	@tuiPure
    stringifyEmployeeList (items: readonly Employee[] ): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map(({id, fullName}) => [id, fullName] as [number, string]));
        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || ``;
    }

	@tuiPure
    stringifyPurposeList (items: readonly ReceptionPurpose[] ): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map(({id, purposeName}) => [id, purposeName] as [number, string]));
        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || ``;
    }

	onClick(){
		console.log("data")
	}

	submitReception(){
		
		if (this.addReceptionForm.status == "VALID"){
			console.log(this.addReceptionForm.value);
			
			// this.clientCardService.getSelectedClient$.pipe(take(1)).subscribe({
            //     next: (data) =>  this.addReceptionForm.value.clientId = data.id
            // })

            // this.createReceptionGQL.mutate({
			// 	data: this.addReceptionForm.value as CreatePetInput
			// })
            // .subscribe({
            //     next: () => { 
            //         this.alertService.open("Питомец успешно добавлен!", {status: TuiNotification.Success}).subscribe();
            //         this.context.completeWith(1); 
            //     },
            //     error: (error)  => 
            //     {
            //         this.alertService.open("Питомец уже добавлен", {status: TuiNotification.Error}).subscribe()
            //         console.log(error)
            //     }
            // })
		}
	}
}