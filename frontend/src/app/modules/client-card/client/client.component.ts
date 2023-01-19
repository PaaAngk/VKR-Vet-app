import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { Client } from 'src/graphql/generated';
import { ClientCardService } from '../client-card.service';
import { AddClientComponent } from '../dialog/add-client/add-client.component';

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
        new PolymorpheusComponent(AddClientComponent, this.injector),
        {
            dismissible: true,
            label: `Добавление клиента `,
        },
    );
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private clientCardService: ClientCardService,
		private _changeDetectorRef: ChangeDetectorRef,
		private router: Router,
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

		this.searchForm.valueChanges
		.pipe(takeUntil(this._unsubscribeAll), tap({next: () => (this.loading= true, console.log("DSD"))}))
		.pipe(debounceTime(1000))
		.subscribe({
			next: () => {this.clientCardService.getClientsData(String(this.searchForm.value.search))}
		})
	}

	ngOnDestroy(): void
	{
		console.log("DEstroy")
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