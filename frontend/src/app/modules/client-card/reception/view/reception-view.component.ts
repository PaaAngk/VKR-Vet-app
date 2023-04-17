import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultEditorExtensions, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { Client, GetReceptionGQL, Reception } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
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
	assignmentButtonLoader = false;
	checkButtonLoader = false;

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
   

	errInDocumentGeneration = () => {
		this.alertService.open("Обратитесь к администратору или обновите страницу", 
		{
			status: TuiNotification.Error, 
			label: "Ошибка генерации документа!",
			autoClose: 5000,
		}).subscribe()
	}

	assignmentPrint(){
		this.assignmentButtonLoader = true;
		this.documentGenerateService.assignmentGenerate(this.reception, 'pdf').subscribe({
			error: () => this.errInDocumentGeneration(),
			complete: () => {this.assignmentButtonLoader = false, this._changeDetectorRef.markForCheck()}
		})
	}
	assignmentDownload(){
		this.assignmentButtonLoader = false;
		this.documentGenerateService.assignmentGenerate(this.reception, 'docx').subscribe({
			error: () => this.errInDocumentGeneration(),
			complete: () => {this.assignmentButtonLoader = false, this._changeDetectorRef.markForCheck()}
		})
	}	

	checkPrint(){
		this.checkButtonLoader = true;
		this.documentGenerateService.checkGeneratePdfOnServer(this.reception).subscribe({
			next: () => {this.checkButtonLoader = false, this._changeDetectorRef.markForCheck()},
			error: () => this.errInDocumentGeneration()
		})
	}
	checkDownload(){
		this.documentGenerateService.checkGenerateWord(this.reception).subscribe({
			error: () => this.errInDocumentGeneration(),
			complete: () => {this.checkButtonLoader = false, this._changeDetectorRef.markForCheck()}
		})
	}	
}