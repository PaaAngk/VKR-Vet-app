import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { Client, Pet } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';
import {PolymorpheusComponent, PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { PetDialogComponent } from '../../dialog/add-pet/pet-dialog.component';
import { tuiWatch } from '@taiga-ui/cdk';
import { DialogClientComponent } from '../../dialog/client-dialog/client-dialog.component';
import { DocumentGenerateService, FileFormat } from '../../document-generate.service';
import { DocumentsToGenerate } from '../../models/documentsToGenerate';

@Component({
	selector: 'vet-crm-client-detail',
	templateUrl: './client-detail.component.html',
	styleUrls: ['./client-detail.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();


	client = {} as Client;
	pets = [] as Pet[];
	activeItemIndex = 0;
	readonly petsColumns = ['alias', 'kind', 'gender', 'DOB', 'breed', 'actions'];
	pageLoader = false;

	listOfDocumentToGenerate: DocumentsToGenerate[] = [
		// {name: 'Первичный договор', fileName: 'Pervichnyj_dogovor'}, 
	]
	

	private readonly dialogAddPet = this.dialogService.open<number>(
        new PolymorpheusComponent(PetDialogComponent, this.injector),
        {
			data: "add",
            dismissible: false,
            label: `Добавление питомца`,
        },
    );

	private readonly dialogEditClient = this.dialogService.open<string>(
        new PolymorpheusComponent(DialogClientComponent, this.injector),
        {
			data: "edit",
            dismissible: true,
            label: `Изменение данных клиента`,
        },
    );

    constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,

		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activateRoute: ActivatedRoute,
		private documentGenerateService: DocumentGenerateService,
		private location: Location,
    ) {
		this.pageLoader = true;

		activateRoute.params.subscribe(params=>this.clientCardService.setSelectedClient(Number(params['id'])));

		activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                if(queryParam['addPet']) this.showDialogAddPet()
            }
        );

		// Getting clients data 
		this.clientCardService.getSelectedClient$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe({
			next: (client: Client) => {
				if (Object.keys(client).length !== 0){
					this.pageLoader = false;
				}
				this.client = {...client, pets:[]}
				this.pets = client.pets || []
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
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
   
	showDialogAddPet(): void {
        this.dialogAddPet
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe({ complete: () => this.router.navigate([]) });
    }

	navigatePetDetail(petId: number){
		this.router.navigateByUrl(`client-card/pet/${petId}`);
	}

	showDialogEditClient(): void {
        this.dialogEditClient.pipe(takeUntil(this._unsubscribeAll)).subscribe();
    }

	deleteClient(content: PolymorpheusContent<TuiDialogContext>):void{
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{label: 'Подтвердите удаление клиента:',size: 's'})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
				this.clientCardService.deleteClient(this.client.id).subscribe({
					next: () => {
						this.alertService.open("", {status: TuiNotification.Success, label:"Клиент удален!"}).subscribe();
						this.router.navigateByUrl(`client-card`);
					},
					error: (err) => {
						console.log(err); 
						this.alertService.open("Не удалось удалить клиента", {status: TuiNotification.Error, label:"Ошибка удаления"}).subscribe();
					}
				})
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
	}

	generateDoc(docName: string){
		if (docName === 'Pervichnyj_dogovor'){
			this.documentGenerateService.generateDocumentByData(docName, this.client, FileFormat.pdf);
		}
	}

}