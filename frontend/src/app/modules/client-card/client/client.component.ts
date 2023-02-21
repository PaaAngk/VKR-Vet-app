import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { Client } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import { DialogClientComponent } from '../dialog/client-dialog/client-dialog.component';

interface ClientTable {
	readonly time: string;
	readonly client: Client;
}

@Component({
	selector: 'vet-crm-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	clients : ClientTable[] = [] as ClientTable[];
	readonly columns = [`time`, `fullName`, `telephone`, `pets`, `actions`];

	loading = false;

	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});

	private readonly dialog = this.dialogService.open<number>(
        new PolymorpheusComponent(DialogClientComponent, this.injector),
        {
			data: "add",
            dismissible: true,
            label: `Добавление клиента `,
        },
    );
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(Router) private readonly router: Router,
		@Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
    ) {
		// Getting data 
		this.loading = true;
		this.clientCardService.getclientsData$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((clients: Client[]) => {	
			const time = '4:20';
			this.clients = clients.map(client => {
				return {
					time:time,
					client:client
				} as ClientTable
			})
			this.loading = false;
		});
		
		// Поиск из ссылки
		if(this.activatedRoute.snapshot.queryParams['search']){
			this.searchForm.setValue({
				search: this.activatedRoute.snapshot.queryParams['search']
			})
			this.clientCardService.getClientsData(String(this.searchForm.value.search));
		}

		// Поиск по вводу в поле
		this.searchForm.valueChanges
		.pipe(takeUntil(this._unsubscribeAll), tap({next: () => this.loading= true}))
		.pipe(debounceTime(1000))
		.subscribe({
			next: () => {
				console.log(this.searchForm.value)
				this.clientCardService.getClientsData(String(this.searchForm.value.search));
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
        this.dialog.subscribe();
    }

	setClient(clientId : string) {
		this.clientCardService.setSelectedClient(clientId);
		this.router.navigateByUrl(`client-card/client/${clientId}`);
	}
}