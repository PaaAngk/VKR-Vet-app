import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Client, GetAllAnalyzeTypesGQL, GetAnalyzesResearchGQL, GetReceptionGQL, Reception } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
import { DocumentGenerateService } from '../../document-generate.service';
import { DynamicFilterBase } from 'src/app/shared/components/advanced-dynamic-filter';
import { AnalyzesList } from "../analyzeFormTemplates";
import { AnalyzeType } from '../../models/analyzeType';


@Component({
	selector: 'vet-crm-analyzes-view',
	templateUrl: './analyzes-view.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzesViewComponent implements OnDestroy, OnInit {
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	/** Interface */
	@ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;
	readonly printButtonData : ButtonWithDropdown = {
		buttonName: 'Печать',
		dropdownItems : [
			{name: "Скачать", event:"download"},
		],
	};
	printButtonLoader = false;

	formData: DynamicFilterBase<any> = {} as DynamicFilterBase<any>;
	analyzesList: AnalyzeType[] = AnalyzesList;
	petId = '';

	loading = false;

	readonly tablesColumns = ['name', 'price', 'quantity'];

    constructor(
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private getAnalyzesResearchGQL : GetAnalyzesResearchGQL,
		private activateRoute: ActivatedRoute,
		private documentGenerateService: DocumentGenerateService,
		private getAllAnalyzeTypesGQL : GetAllAnalyzeTypesGQL,
    ){}

	ngOnInit(): void {
		this.loading = true;
		//Getting analyze types 
		this.getAllAnalyzeTypesGQL.watch().valueChanges
			.pipe(take(1))
			.subscribe( ({data}) => {
				// Set id from DB for list of accesing analyzes
				this.analyzesList.map((analyze: AnalyzeType) => 
					analyze['id'] = data.allTypeAnalyzesResearch.find(obj => obj.typeName?.trim() == analyze.name.trim())?.id || -1
				)
			})


		//Getting analyze and formating form for dynamic filter
		this.activateRoute.params.subscribe(params => {
			this.getAnalyzesResearchGQL
			.watch({
				analyzesResearchId:params['id'],
			})
			.valueChanges
			.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
			.subscribe( ({data, loading}) => {
				// this.reception = data.reception as Reception
				const analyzeData = JSON.parse(data.analyzesResearch.data|| '');
				const needAnalyze = this.analyzesList.find(obj => obj.id == data.analyzesResearch.type?.id)
				const form = needAnalyze?.form.dynamicFilterInputs
					.map((item: any) => {
						item.readOnly = true
						item.value = analyzeData[item.key] || null;
						return item
					})
				this.petId = data.analyzesResearch.pet?.id || ''
				this.formData = {
					title: needAnalyze?.name || '',
					dynamicFilterInputs: form
				}
				this.loading = loading;
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

	printAnalyze(){
		this.printButtonLoader = true;
	}
	downloadAnalyze(){
		this.printButtonLoader = false;
	}	
}