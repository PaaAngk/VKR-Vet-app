import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CreateAnalyzesResearchInput, GetAnalyzesResearchGQL, AnalyzesResearch, UpdateAnalyzesResearchInput, Employee } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
import { AnalyzeForm } from '../../models/analyzeType';
import { AnalyzesList } from "../analyzeFormTemplates";
import { DynamicFilterBase, DynamicFilterInput } from 'src/app/shared/components/advanced-dynamic-filter';

@Component({
	selector: 'vet-crm-reception-new',
	templateUrl: './analyzes.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzesComponent implements OnDestroy, OnInit {
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	// Store type with analyze and file name and form
	currentAnalyzeType:AnalyzeForm = null as unknown as AnalyzeForm;
	currentAnalyzeForm$: BehaviorSubject<DynamicFilterBase<any>> = new BehaviorSubject(null as unknown as DynamicFilterBase<any>);

	analyzesList = AnalyzesList;
	// Edited analyze
	analyzeData: AnalyzesResearch = {} as AnalyzesResearch;
	analyzeFileData = [];

	formData = {};
	maySave = false;

	employeesList: string[] = [];
	employee: string = '';

	/** Interface */
	editMode = false;
	petId = -1;
	analyzeId = -1;

	enabledForm = false;

	@ViewChild(TuiHostedDropdownComponent)
    component?: TuiHostedDropdownComponent;
	// open for print buttons
	readonly assignmentPrintButtonData : ButtonWithDropdown = {
		buttonName: 'Печать листа назначения',
		dropdownItems : [
			{name: "Скачать файл", event:"download"},
		],
	};

	loading = false;

    constructor(
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activateRoute: ActivatedRoute,
		
		private getAnalyzesResearchGQL : GetAnalyzesResearchGQL,
    ) {}

	ngOnInit(): void {
		// Getting id pet from url for now reception
		this.activateRoute.params.subscribe(params=> this.petId=Number(params['id']) );
		this.clientCardService.getAllEmployees$.subscribe({
			next:(employees: Employee[]) => this.employeesList = employees.map(d => d.fullName)
		})

		// Set edited analyze(and file) in form 
		if (this.activateRoute.snapshot.url[4] && this.activateRoute.snapshot.url[4].path == 'edit'){
			this.loading = true;
			this.editMode = true;
			this.analyzeId = Number(this.activateRoute.snapshot.url[3].path);

			this.getAnalyzesResearchGQL
				.watch({
					analyzesResearchId: this.analyzeId,
				})
				.valueChanges
				.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
				.subscribe( ({data, loading}) => {
					this.analyzeData = data.analyzesResearch
					const parcedData = JSON.parse(data.analyzesResearch.data || '');
					this.currentAnalyzeType = structuredClone(AnalyzesList.find(obj => obj.id == data.analyzesResearch.type?.id)) as AnalyzeForm;
					
					//if not file
					if (data.analyzesResearch.type?.id != 5){
						const form = this.currentAnalyzeType?.form?.dynamicFilterInputs
							.map((item: DynamicFilterInput<any>) => {
								item.value = parcedData[item.key] || null;
								return item
							})

						this.petId = data.analyzesResearch.pet?.id || -1

						this.currentAnalyzeType.form = {
							title: this.currentAnalyzeType?.name || '',
							dynamicFilterInputs: form as DynamicFilterInput<any>[]
						}
						this.loading = loading;
						console.log(parcedData)
						this.employee = parcedData.employee
						this.currentAnalyzeForm$.next(this.currentAnalyzeType.form)
					}
	
					if (data.analyzesResearch.type?.id == 5){
						this.analyzeFileData = parcedData;
						this.loading = loading;
					}
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

	readonly stringifyAnalyzeList = (item: AnalyzeForm): string => `${item.name}`;

	onFormUpdate(){
		this.currentAnalyzeForm$?.next(this.currentAnalyzeType.form)
	}

	submitAnalyzes(){			
            if(this.editMode) this.editAnalyzes()
			else this.createAnalyzes();
	}

	createAnalyzes(){
		if(this.currentAnalyzeType.typeName !== 'Files'){
			this.clientCardService.createAnalyzesResearch(
				{ 
					data: JSON.stringify({...this.formData, employee: this.employee}), 
					petId: this.petId,
					typeId: this.currentAnalyzeType.id,
				} as CreateAnalyzesResearchInput
			)
			.subscribe({
				next: (data) => {
					this.successCreate(data?.createAnalyzesResearch.id);
				},
				error: (error)  => 
				{
					this.errorCreate()
					console.log(error)
				}
			})
		}
		else if (this.currentAnalyzeType.typeName === 'Files'){
			this.clientCardService.uploadAnalyzeFile(
				this.formData as File[],
				{ 
					petId: this.petId,
					typeId:this.currentAnalyzeType.id,
					typeName: this.currentAnalyzeType.typeName
				}
			).subscribe({
				next: (data: any) => this.successCreate(data.id),
				error: (error)  => {
					this.errorCreate()
					console.log(error)
				}
			})
		}
	}

	editAnalyzes(){
		if(this.currentAnalyzeType.typeName !== 'Files'){
			this.clientCardService.updateAnalyzesResearch(
				this.analyzeData.id,
				{
					data: JSON.stringify({...this.formData, employee: this.employee}),
				} as UpdateAnalyzesResearchInput
			)
			.subscribe({
				next: (data) => this.successEditAlert(data?.updateAnalyzesResearch.id || -1),
				error: (error)  => { this.errorEditAlert(), console.log(error) }
			})
		}
		if(this.currentAnalyzeType.typeName === 'Files'){
			// this.clientCardService.updateAnalyzesResearch(
			// 	this.analyzeData.id,
			// 	{
			// 		data: JSON.stringify(this.formData), 
			// 	} as UpdateAnalyzesResearchInput
			// )
			// .subscribe({
			// 	next: (data) => this.successEditAlert(data?.updateAnalyzesResearch.id || ''),
			// 	error: (error)  => { this.errorEditAlert(), console.log(error) }
			// })
		}
	}

	dataFromForm(event: any){
		this.formData = event;
		if (this.currentAnalyzeType.typeName === 'UZI_EKHO'){
			this.maySave = Object.keys(this.formData).length == 0 ? 
			false 
			: (this.employee == '' ? false : true)
		} else{
			this.maySave = Object.keys(this.formData).length == 0 ? false : true
		}
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Alerts
	// -----------------------------------------------------------------------------------------------------

	successCreate(id: any){
		this.loading = false;
		this.alertService.open("", {
			status: TuiNotification.Success,
			label:"Анализ/Исследование успешно добавлен!",
			autoClose: 5000,
		}).subscribe();
		this.router.navigate([`../${id}`], {relativeTo: this.activateRoute})
	}

	errorCreate(){
		this.loading = false;
		this.alertService.open(
			"Проверьте правильность введенных данных", 
			{
				status: TuiNotification.Error, 
				label: "Невозможно добавить анализ/исследование!",
				autoClose: 5000,
			}).subscribe()
	}

	successEditAlert(id: number){
		this.loading = false;
		this.alertService.open("", {
			status: TuiNotification.Success,
			label:"Анализ успешно обновлен!",
			autoClose: 5000,
		}).subscribe();
		this.router.navigate([`/client-card/pet/${this.petId}/analyzes/${id}`], {relativeTo: this.activateRoute})
	}

	errorEditAlert(){
		this.loading = false;
		this.alertService.open(
		"Проверьте правильность введенных данных", 
		{
			status: TuiNotification.Error, 
			label: "Невозможно обновить анализ!",
			autoClose: 5000,
		}).subscribe()
	}
}