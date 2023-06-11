import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { AnalyzesResearch, GetAnalyzesResearchGQL } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
import { DocumentGenerateService, FileFormat } from '../../document-generate.service';
import { DynamicFilterBase, DynamicFilterInput } from 'src/app/shared/components/advanced-dynamic-filter';
import { AnalyzesList } from "../analyzeFormTemplates";
import { AnalyzeForm } from '../../models/analyzeType';
import { AgeStringPipe } from 'src/app/shared/pipes';
import { DatePipe } from '@angular/common';

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

	dynamicFormData$: BehaviorSubject<DynamicFilterBase<any>> = new BehaviorSubject({} as DynamicFilterBase<any>);
	analyzesList: AnalyzeForm[] = AnalyzesList;
	petId = -1;
	currentAnalyze: AnalyzeForm = {} as AnalyzeForm;
	analyzeData: AnalyzesResearch = {} as AnalyzesResearch;
	analyzeFileData = [];
	employee: string = '';
	isFilesAnalyze = false;
	loading = false;

	readonly tablesColumns = ['name', 'price', 'quantity'];

    constructor(
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
		private _changeDetectorRef: ChangeDetectorRef,
		private getAnalyzesResearchGQL : GetAnalyzesResearchGQL,
		private activateRoute: ActivatedRoute,
		private documentGenerateService: DocumentGenerateService,
		private ageStringPipe: AgeStringPipe,
		private clientCardService: ClientCardService,
		@Inject(Router) private readonly router: Router,
		@Inject(DatePipe) private datePipe: DatePipe,
    ){}

	ngOnInit(): void {
		this.loading = true;
		this.activateRoute.params.subscribe(params => {
			this.getAnalyzesResearchGQL
			.watch({
				analyzesResearchId:Number(params['id']),
			}, {fetchPolicy: 'network-only'})
			.valueChanges
			.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
			.subscribe({
				next: ({data, loading}) => {
					this.analyzeData = data.analyzesResearch
					const parcedData = JSON.parse(data.analyzesResearch.data || '');
					this.currentAnalyze = structuredClone(this.analyzesList.find(obj => obj.id == data.analyzesResearch.type?.id)) as AnalyzeForm;
					this.petId = data.analyzesResearch.pet?.id || -1
					if (data.analyzesResearch.type?.id != 5 && data.analyzesResearch.type?.id != 8) this.isFilesAnalyze = false;
					else this.isFilesAnalyze = true;
					
					//if not file
					if (!this.isFilesAnalyze){
						// Getting analyze and formating form for dynamic filter
						//Search in array of analyzes and select needed with file name and needed form for selected analyze		
						//Getting analyze and formating form for dynamic filter
						const form = this.currentAnalyze?.form?.dynamicFilterInputs
							.map((item: DynamicFilterInput<any>) => {
								item.readOnly = true
								item.value = parcedData[item.key] || null;
								return item
							})
						this.dynamicFormData$.next({
							title: this.currentAnalyze?.name || '',
							dynamicFilterInputs: form as DynamicFilterInput<any>[]
						})
						this.loading = loading;
						this.employee = parcedData.employee
					}
					// if file or x-ray
					if (this.isFilesAnalyze){
						this.analyzeFileData = parcedData;
						this.loading = loading;
					}
				},
				error: (err) => {
					this.alertService.open("Перезагрузите страницу или обратитесь к администратору", {
						status: TuiNotification.Error,
						label:"Анализ/Исследование не найден!",
						autoClose: 10000,
					}).subscribe();
					console.log(err)
					this.router.navigateByUrl("client-card");
				},
			});
		});
	}

	ngOnDestroy(): void
	{
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
		this.dynamicFormData$.next( {} as DynamicFilterBase<any>);
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
		this.printButtonLoader = false;
	}

	printAnalyze(){
		this.printButtonLoader = true;
		this.documentGenerateService.generateDocumentByData(
			this.currentAnalyze.typeName, 
			{
				...this.analyzeData,
				age:  this.ageStringPipe.transform(this.analyzeData.pet?.DOB || ''),
				createdAt: this.datePipe.transform(this.analyzeData.createdAt, 'dd.MM.yyyy')
			},
			FileFormat.pdf
		).subscribe({
			error: () =>  this.errInDocumentGeneration(),
			complete: () =>  {
				this.printButtonLoader = false,
				this._changeDetectorRef.markForCheck()
			}
		})
	}

	downloadAnalyze(){
		this.printButtonLoader = true;
		this.documentGenerateService.generateDocumentByData(
			this.currentAnalyze.typeName,
			{
				...this.analyzeData,
				age:  this.ageStringPipe.transform(this.analyzeData.pet?.DOB || ''),
				createdAt: this.datePipe.transform(this.analyzeData.createdAt, 'dd.MM.yyyy')
			},
			FileFormat.docx
		).subscribe({
			error: () =>  this.errInDocumentGeneration(),
			complete: () =>  {
				this.printButtonLoader = false,
				this._changeDetectorRef.markForCheck()
			}
		})
	}

	navigateToEdit(){
		this.router.navigate([`edit`], { relativeTo: this.activateRoute} );
	}

	deleteAnalyze(content:  any){
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{label: 'Подтвердите удаление анализа/исследования:',size: 's'})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () => {
				this.clientCardService.deleteAnalyzesResearch(this.analyzeData.id)
				.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
				.subscribe({
					next: (data) => {
						if (data?.deleteResearch.id){
							this.alertService.open("", {
								status: TuiNotification.Success,
								label:"Анализ/Исследование успешно удален!",
								autoClose: 10000,
							}).subscribe();
						}
						this.router.navigateByUrl(`client-card/pet/${this.analyzeData.pet?.id}`);
					},
					error: (err) => {
						this.alertService.open("Перезагрузите страницу или обратитесь к администратору", {
							status: TuiNotification.Error,
							label:"Анализ/Исследование не удалось удалить!",
							autoClose: 10000,
						}).subscribe();
						console.log(err)
						this.router.navigateByUrl("client-card");
					},
				});
				
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
	}
			
}