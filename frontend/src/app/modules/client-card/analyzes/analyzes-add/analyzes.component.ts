import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Subject, take, takeUntil } from 'rxjs';
import { GetAllAnalyzeTypesGQL, CreateAnalyzesResearchInput } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import { ButtonWithDropdown } from 'src/app/shared/components/button-with-dropdown/buttonWithDropdown.interface';
import { AnalyzeType } from '../../models/analyzeType';
import { Analiz_kroviForm, AnalyzesList } from "../analyzeFormTemplates";

@Component({
	selector: 'vet-crm-reception-new',
	templateUrl: './analyzes.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzesComponent implements OnDestroy, OnInit {
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	currentAnalyzeType:AnalyzeType = null as unknown as AnalyzeType;

	analyzesList: AnalyzeType[] = AnalyzesList;

	formData = {};
	maySave = false;

	/** Interface */
	editMode = false;
	receptionId = '';
	petId = '';

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
		private getAllAnalyzeTypesGQL : GetAllAnalyzeTypesGQL,
    ) {}

	ngOnInit(): void {
		// Getting id pet from url for now reception
		this.activateRoute.params.subscribe(params=> this.petId=params['id'] );

		//Getting analyze types 
		this.getAllAnalyzeTypesGQL.watch().valueChanges
			.pipe(take(1))
			.subscribe( ({data}) => {
				// Set id from DB for list of accesing analyzes
				this.analyzesList.map((analyze: AnalyzeType) => 
					analyze['id'] = data.allTypeAnalyzesResearch.find(obj => obj.typeName?.trim() == analyze.name.trim())?.id || -1
				)
			})

		// Getting reception data for edit and fill current form
		// if (this.activateRoute.snapshot.url[4] && this.activateRoute.snapshot.url[4].path == 'edit'){
		// 	this.editMode = true;
		// 	this.receptionId = this.activateRoute.snapshot.url[3].path;
		// 	this.getReceptionGQL
		// 	.watch({
		// 		receptionId: this.receptionId
		// 	}).valueChanges
		// 	.pipe(tuiWatch(this._changeDetectorRef),takeUntil(this._unsubscribeAll))
		// 	.subscribe( ({data, loading}) => {
		// 		this.loading = loading;
		// 		const reception : Reception = data.reception
		// 		// this.addReceptionForm.setValue({
		// 		// 	employeeId: -1,
		// 		// 	purposeId: -1,
		// 		// 	anamnesis: reception.anamnesis as string,
		// 		// 	clinicalSigns: reception.clinicalSigns as string,
		// 		// 	diagnosis: reception.diagnosis as string,
		// 		// 	assignment: reception.assignment as string,
		// 		// 	cost: reception.cost as number,
		// 		// 	discount:reception.discount as number || 0,
		// 		// 	employeeInput: reception.employee as Employee,
		// 		// 	visitPurposeInput: reception.purpose as ReceptionPurpose,
		// 		// });
		// 		// this.selectGoodsInput = reception.goods?.map(goodsItem => ({...goodsItem?.goods, quantity: goodsItem?.quantity} ) )as SelectedGoods[]
		// 		// this.selectedGoods = this.selectGoodsInput;

		// 		// this.selectedServices = reception.services?.map(serviceItem => ({...serviceItem?.service, quantity: serviceItem?.quantity} ) )as SelectedService[]
		// 		// this.selectServiceInput = this.selectedServices
		// 	});
		// }
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

	readonly stringifyAnalyzeList = (item: AnalyzeType): string => `${item.name}`;

	submitAnalyzes(){
			// this.loading = true;
			
            // if(this.editMode) this.editReception(goodsListReceptionInput, serviceListReceptionInput)
			// else this.createReception(goodsListReceptionInput, serviceListReceptionInput)
			this.createAnalyzes()
	}

	createAnalyzes(){
		this.clientCardService.createAnalyzesResearch(
			{ 
				data: JSON.stringify(this.formData), 
				petId: this.petId,
				typeId:this.currentAnalyzeType.id
			} as CreateAnalyzesResearchInput
		)
		.subscribe({
			next: (data) => {
				this.loading = false;
				this.alertService.open("", {
					status: TuiNotification.Success,
					label:"Анализ успешно добавлен!",
					autoClose: 5000,
				}).subscribe();
				this.router.navigate([`../${data?.createAnalyzesResearch.id}`], {relativeTo: this.activateRoute})
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Проверьте правильность введенных данных", 
					{
						status: TuiNotification.Error, 
						label: "Невозможно добавить анализ!",
						autoClose: 5000,
					}).subscribe()
				console.log(error)
			}
		})
	}

	editReception(){
		// this.clientCardService.updateReception(
		// 	this.receptionId,
		// 	{ ...this.addReceptionForm.value, goodsListReceptionInput, serviceListReceptionInput } as UpdateReceptionInput
		// ).subscribe({
		// 	next: () => {
		// 		this.loading = false;
		// 		this.alertService.open("", {
		// 			status: TuiNotification.Success, 
		// 			label:"Прием успешно изменен!",
		// 			autoClose: 5000,
		// 		}).subscribe();
		// 		this.router.navigate([`/client-card/pet/${this.petId}/reception/${this.receptionId}`], {relativeTo: this.activateRoute})
		// 	},
		// 	error: (error)  => 
		// 	{
		// 		this.alertService.open(
		// 			"Проверьте правильность введенных данных", 
		// 			{
		// 				status: TuiNotification.Error, 
		// 				label: "Невозможно изменить прием!",
		// 				autoClose: 5000,
		// 			}).subscribe()
		// 		console.log(error)
		// 	}
		// })
	}

	dataFromDialog(event: any){
		this.formData = event;
		this.maySave = Object.keys(this.formData).length == 0 ? false : true
	}
}