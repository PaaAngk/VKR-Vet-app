import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloQueryResult, Observable } from '@apollo/client';
import { defaultEditorExtensions, TuiEditorTool, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/addon-editor';
import { TuiContextWithImplicit, TuiHandler, TuiIdentityMatcher, tuiIsNumber, tuiPure, TuiStringHandler, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { map, of, startWith, Subject, switchMap, take, takeUntil } from 'rxjs';
import { GetAllServiceTypeWithServiceNameGQL, Pet, Service, ServiceType } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';

interface SelectedService{
	readonly id: number;
    readonly name: string;
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

	pet: Pet = {} as Pet;
	activeItemIndex = 2;
	readonly receptionColumns = ['receptionPurpose', 'diagnosis', 'date', 'cost', 'actions'];
	readonly servicesColumns = ['name', 'price', 'actions'];
	employeeList = ['item1', 'item2', 'item3'];
	purposeList = ['item11', 'item22', 'item33'];
	servicesList : Array<any> = []; // any for work with universal component by her interface
	selectedServices : SelectedService[] = [];

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

	value = [];

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private getAllServiceTypeWithServiceNameGQL: GetAllServiceTypeWithServiceNameGQL,
    ) {
	}

	ngOnInit(): void {
		this.getAllServiceTypeWithServiceNameGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this.servicesList = data.data.allServiceType.map(item => renameKeys(item, { service: "items" })) as Array<ServiceType>;
				this._changeDetectorRef.markForCheck();
            },
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

	readonly identityMatcher: TuiIdentityMatcher<readonly string[]> = (items1, items2) =>
	items1.length === items2.length && items1.every(item => items2.includes(item));

	readonly valueContent: TuiStringHandler<TuiContextWithImplicit<readonly any[]>> =
		({$implicit}) => {
			this.selectService([...$implicit]);
			if (!$implicit.length) {
				return `Ничего не выбрано`;
			}
			return `Выбрано: ${$implicit.length}`;
		};

		//Сделать добавление в массив только нового поступившего элемента с сохранением уже находящихс таких же массивов
	selectService(service: any[]){
		this.selectedServices = service.map(item => ({...item, quantity : 1})) as SelectedService[];
		this._changeDetectorRef.detectChanges();
	}

	onValueChange<K extends keyof SelectedService>(
        value: SelectedService[K],
        key: K,
        current: SelectedService,
        data: readonly SelectedService[],
    ): void {
        const updated = {...current, [key]: value};
		console.log(data + " " + updated)
 
        // this.pythons =
        //     data === this.pythons
        //         ? this.pythons.map(item => (item === current ? updated : item))
        //         : this.pythons;
 
        // this.starwars =
        //     data === this.starwars
        //         ? this.starwars.map(item => (item === current ? updated : item))
        //         : this.starwars;
    }
}

function renameKeys(obj: { [x: string]: any; }, newKeys: { [x: string]: string; }) {
	const keyValues = Object.keys(obj).map(key => {
		const newKey = newKeys[key] || key;
		return { [newKey]: obj[key] };
	});
	return Object.assign({}, ...keyValues);
}








// readonly control = new FormControl([]);

// 	private readonly searchServicesList$ = new Subject<string>();

// 	readonly servicesList$ = this.searchServicesList$.pipe(
//         startWith(``),
// 		switchMap(search =>
//             of(this.servicesList).pipe(
//                 map(items =>
//                     items
// 					.filter(({name}) => TUI_DEFAULT_MATCHER(name, search))
// 					.map(({id}) => id),
//                 ),
//             ),
//         ),
//         startWith(null),
//     );


// 	onSearch(search: string | null): void {
// 		this.searchServicesList$.next(search || ``);
//     }

// 	get content(): string {
//         return `Selected ${this.control.value?.length || 0} of ${this.servicesList.length}`;	
//     }

// 	/////////////////////////////////////////////
// 	@tuiPure
//     filter(search: string | null): readonly string[] {
//         // return this.servicesList.filter(item => TUI_DEFAULT_MATCHER(item.name, search || ``));
// 		return this.servicesList
// 			.filter(({name}) => TUI_DEFAULT_MATCHER(name, search || ``))
// 			.map(({name}) => name) as string[]
//     }

// 	onSearch1(search: string | null): void {
// 		this.searchServicesList$.next(search || ``);
//     }