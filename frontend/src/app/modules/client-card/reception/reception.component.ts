import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from '@apollo/client';
import { defaultEditorExtensions, TuiEditorTool, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { TuiDialogService } from '@taiga-ui/core';
import { map, Subject, take, takeUntil } from 'rxjs';
import { GetAllServiceGQL, GetAllServiceQuery, Pet, Service } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';

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
export class ReceptionComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	pet: Pet = {} as Pet;
	activeItemIndex = 2;
	readonly receptionColumns = ['receptionPurpose', 'diagnosis', 'date', 'cost', 'actions'];
	readonly servicesColumns = ['name', 'price', 'actions'];
	employeeList = ['item1', 'item2', 'item3'];
	purposeList = ['item11', 'item22', 'item33'];
	servicesList : Service[] = [];


	editorSettengs: ReadonlyArray<TuiEditorTool> = [TuiEditorTool.Undo, TuiEditorTool.Bold, TuiEditorTool.Italic, TuiEditorTool.Underline, TuiEditorTool.List,
		TuiEditorTool.Color, TuiEditorTool.Size, TuiEditorTool.Sup, TuiEditorTool.Sub, TuiEditorTool.HR, TuiEditorTool.Link, TuiEditorTool.Hilite]
	
	readonly addPetForm = new FormGroup({
        employee: new FormControl(null),
        purpose: new FormControl('', [Validators.required, Validators.minLength(2)]),
        anamnesis: new FormControl(null),
		clinicalSigns: new FormControl(null),
		diagnosis: new FormControl(null),
		assignment: new FormControl(null),
		testValue1: new FormControl(null),
		value: new FormControl(null),
	});
	readonly testValue = new FormControl();

	readonly stringify = (item: {name: string; price: number; type: any}): string => `${item.name} ${item.price} ${item.type.typeName}`;
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private getAllServiceGQL: GetAllServiceGQL
    ) {
		this.getAllServiceGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this.servicesList = data.data.allServices
				console.log(this.servicesList);
				this._changeDetectorRef.markForCheck();
            },
		});

		// Getting data 
		this.clientCardService.getPet$
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe((pet: Pet) => {
			this.pet = pet;
			console.log(pet);
			this._changeDetectorRef.markForCheck();
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


}
