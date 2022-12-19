import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

interface Pet {
	readonly alias:string;
	readonly kind:string;
}
interface Client {
	readonly time: string;
	readonly fullName: string;
	readonly telephone: string;
	readonly pets: Pet[];
}


@Component({
	selector: 'vet-crm-client',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
	data = [];
	readonly columns = [`time`, `fullName`, `telephone`, `pets`, `actions`];
	users: readonly Client[] = [
		{
			time: `10:15`,
			fullName: `Иванов Иван Иванович`,
			telephone: `89365147824`,
			pets: [{alias:"Пэти", kind:"Кошка"}],
		},
		{
			time: `11:30`,
			fullName: `Сидоров Сидор Сидорович`,
			telephone: `89365147824`,
			pets: [
				{alias:"Дог", kind:"Кошка"},
				{alias:"Кэт", kind:"Собака"}
			],
		}
	];

	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});

	constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {}
 
    showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogService.open(content).subscribe();
    }

}
