import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPageInfo } from '@iharbeck/ngx-virtual-scroller';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { debounceTime, Subject, take, takeUntil, tap } from 'rxjs';
import { Client, ClientConnection, ClientOrder, ClientOrderField, OrderDirection } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import { DialogClientComponent } from '../dialog/client-dialog/client-dialog.component';

@Component({
	selector: 'vet-crm-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnDestroy, OnInit{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	private endCursor: number | null = null;
	private fetchSize = 10;
	private endIndexFromVirtScroll = 0;
	private isEndFetch = false;
	orderByDefault: ClientOrder = {direction: OrderDirection.Asc, field:ClientOrderField.Id};

	clients: Client[] = [];

	readonly columns = [`fullName`, `telephone`, `pets`, `actions`];
	loadingPage = false;
	loadingTable = false;
	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});
	private readonly dialog = this.dialogService.open<number>(
        new PolymorpheusComponent(DialogClientComponent, this.injector),
        {
			data: "add",
            dismissible: false,
            label: `Добавление клиента `,
        },
    );

 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		public _changeDetectorRef: ChangeDetectorRef,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
    ) {
		this.clientCardService.getclientsData$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((client: Client[]) => {
			this.clients = client
		});
		this.loadingPage = true;
	}

	ngOnInit(): void {
		let searchString = ""
		// Поиск из ссылки
		if(this.activatedRoute.snapshot.queryParams['search']){
			this.searchForm.setValue({
				search: this.activatedRoute.snapshot.queryParams['search']
			})
			searchString = String(this.searchForm.value.search)
		} 
		
		// initial data
		this.clientCardService.searchClientsWithPagination
			(searchString, this.fetchSize, this.endCursor, this.orderByDefault)
			.pipe(tuiWatch(this._changeDetectorRef), take(1))
			.subscribe((clients: ClientConnection) => {
				this.loadingPage = false;
				this.endCursor = clients.nodes[clients.nodes.length - 1].id || null
			});

		// Поиск по вводу в поле
		this.searchForm.valueChanges
		.pipe(
			takeUntil(this._unsubscribeAll), 
			debounceTime(500), 
			tap({next: () => {this.loadingPage= true; this._changeDetectorRef.markForCheck();}})
		)
		.subscribe({
			next: () => {
				console.log(this.searchForm.value.search)
				this.endCursor = null;
				this.endIndexFromVirtScroll = 0;
				this.isEndFetch = false;
				this.clientCardService.searchClientsWithPagination
					(String(this.searchForm.value.search), this.fetchSize, this.endCursor, this.orderByDefault)
					.pipe(tuiWatch(this._changeDetectorRef), take(1))
					.subscribe((clients: ClientConnection) => {
						this.loadingPage = false;
						if (clients.nodes.length > 0)
							this.endCursor = clients.nodes[clients.nodes.length - 1].id || null;
					});
				this.router.navigate([], 
				{
					relativeTo: this.activatedRoute,
					queryParams: { search: this.searchForm.value.search },
					queryParamsHandling: 'merge'
				});
			}
		})
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

    showDialog(): void {
        this.dialog.subscribe({ next: () => this.endIndexFromVirtScroll +=1 });
    }

	// Open client detail
	setClient(clientId : number) {
		this.clientCardService.setSelectedClient(clientId);
		this.router.navigateByUrl(`client-card/client/${clientId}`);
	}

	//Set query for open dialog with pet adding 
	newPet(clientId : number) {
		this.clientCardService.setSelectedClient(clientId);
		this.router.navigate([`client-card/client/${clientId}`], {queryParams:{'addPet':'dialog'}});
	}

	protected fetchMore(event: IPageInfo) {
		// Переменная endIndexFromVirtScroll нужна для отмены постоянных запросов приходящих с
		// библиотеки, так отсекаются испольненные запросы, а если не исполнился возращаем переменную на предыдущее значение
        if (
			this.endIndexFromVirtScroll>= event.endIndex || 
			event.endIndex !== this.clients.length-1 || 
			event.endIndex === -1  ||
			this.isEndFetch
			) return;
		const prevEndIndexFromVirtScroll = this.endIndexFromVirtScroll
		this.endIndexFromVirtScroll = event.endIndex
        this.loadingTable = true;
		this.clientCardService.searchClientsWithPagination
			(String(this.searchForm.value.search), 5, this.endCursor, {direction: OrderDirection.Asc, field:ClientOrderField.Id})//this.fetchSize
			.pipe(tuiWatch(this._changeDetectorRef), take(1))
			.subscribe({
				next: (clients: ClientConnection) =>{
					this.isEndFetch = clients.totalCount === this.clients.length
					if (!this.isEndFetch) {
						this.endCursor = clients.nodes[clients.nodes.length - 1].id;
					}
					this.loadingTable = false;
					// console.log(clients.totalCount-1)
					// console.log(this.clients.length)
				},
				error: (err) => {
					console.log(err);
					this.endIndexFromVirtScroll = prevEndIndexFromVirtScroll;
					this.loadingTable = false;
				}
			});
    }

	public trackByFunction(index: number, complexItem: Client): number {
		return complexItem.id;
	}
	
}