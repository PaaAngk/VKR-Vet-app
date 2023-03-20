import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { Client, GetReceptionGQL, Reception } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown, ButtonWithDropdownItem } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
import { Location } from '@angular/common';
import { DocumentGenerateService } from '../../document-generate.service';

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
	templateUrl: './reception-view.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
		  provide: TUI_EDITOR_EXTENSIONS,
		  useValue: defaultEditorExtensions,
		},
	],
})
export class ReceptionViewComponent implements OnDestroy, OnInit {
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/** Interface */
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

	readonly tablesColumns = ['name', 'price', 'quantity'];
	reception : Reception = {} as Reception;
	client = {} as Client;

	selectedServices : SelectedService[] = [];
	selectServiceInput : SelectedService[] = [];
	selectedGoods : SelectedGoods[] = [];
	selectGoodsInput : SelectedGoods[] = [];

	
	readonly addReceptionForm = new FormGroup({
        employee: new FormControl("", [Validators.required]),
        purpose: new FormControl("", [Validators.required]),
        anamnesis: new FormControl(''),
		clinicalSigns: new FormControl(''),
		diagnosis: new FormControl(''),
		assignment: new FormControl(''),
		petId: new FormControl(),
		cost: new FormControl(),
	});

    constructor(
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private getReceptionGQL : GetReceptionGQL,
		private activateRoute: ActivatedRoute,
		private documentGenerateService: DocumentGenerateService,
    ){}

	ngOnInit(): void {
		this.loading = true;
		this.activateRoute.params.subscribe(params => {
			this.getReceptionGQL
			.watch({
				receptionId:params['id'],
			})
			.valueChanges
			.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
			.subscribe( ({data, loading}) => {
				this.loading = loading;
				this.reception = data.reception as Reception
			});
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

	assignmentPrint(){
		console.log("data")
	}
	assignmentDownload($event : ButtonWithDropdownItem){
		console.log($event)
	}	

	checkPrint(){
		this.documentGenerateService.checkGenerate(this.reception, 'docx')
	}
	checkDownload($event : ButtonWithDropdownItem){
		console.log($event)
	}	
}