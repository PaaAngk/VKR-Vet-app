import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import { TuiValidationError, tuiWatch } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { Goods, UpdateGoodsInput } from 'src/graphql/generated';
import { AddGoodsComponent } from './add-good/add-good.component';
import { GoodsService } from './goods.service';


@Component({
	selector: 'vet-crm-goods',
	templateUrl: './goods.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();

	goods : Goods[] = [] as Goods[];
	filteredGoods : Goods[] = [] as Goods[];
	editedGoods: Goods = {} as Goods;
	updateLoading = false;

	readonly columns = [`name`, `categoryName`, `quantity`, `price`, `actions`];

	loading = false;

	readonly searchForm = new FormGroup({
		search: new FormControl(''),
	});

	private readonly dialogAddPet = this.dialogService.open<number>(
        new PolymorpheusComponent(AddGoodsComponent, this.injector),
        {
            dismissible: true,
            label: `Добавление товара`,
        },
    );
 
    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private goodsService: GoodsService,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    ) {
		// Getting data 
		this.loading = true;
		this.goodsService.getGoods$
		.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		.subscribe((goods: Goods[]) => {	
			this.loading = false;
			this.goods = goods;
			this.filteredGoods = this.setFilteredGoods(this.searchForm.value['search']);
		});

		this.searchForm.valueChanges
		.pipe(takeUntil(this._unsubscribeAll))
		.subscribe({
			next: (data) => {
				this.filteredGoods = this.setFilteredGoods(data['search']);
			}
		})
	}

	ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	get computedError(): TuiValidationError | null {
        return new TuiValidationError(`An error`);
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
   
	readonly categorySorter: TuiComparator<Goods> = (a, b) =>
        tuiDefaultSort(a.category.categoryName, b.category.categoryName);
 
    showDialog(): void {
        this.dialogAddPet.subscribe();
    }

	setFilteredGoods(filterValue: string | null | undefined) : Goods[]{
		return this.goods.filter((goods:Goods) =>{
			return goods.name?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "") ||
			goods.category.categoryName?.toLowerCase().includes(filterValue?.trim().toLowerCase() || "")
		});
	}

	setEditableGoods(goods:Goods){
		this.editedGoods = goods;
	}

	deleteEditableGoods(){
		this.editedGoods = {} as Goods;
	}

	onValueChange<K extends keyof Goods>(
        value: Goods[K],
        key: K,
    ): void {
		this.editedGoods =  {...this.editedGoods, [key]: value};
    }

	updateGood(){
		this.updateLoading = true;
		this.goodsService.updateGoods(
			this.editedGoods.id, 
			{ 
				name: this.editedGoods.name, 
				price: this.editedGoods.price,
				quantity: this.editedGoods.quantity
			} as UpdateGoodsInput
		).subscribe({
			next: () => { 
				this.alertService.open(
					"", 
					{
						status: TuiNotification.Success, 
						label:"Товар успешно изменен!",
					}).subscribe();
					this.editedGoods = {} as Goods;
					this.updateLoading = false;
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Услуга уже добавлена", 
					{
						status: TuiNotification.Error, 
						label:"Ошибка обновления услуги",
						autoClose: 5000,
					}
					).subscribe()
				console.log(error)
			}
		})
	}	

	deleteGoods(goods : Goods){
		this.goodsService.deleteGoods(
			goods.id
		).subscribe({
			next: () => { 
				this.alertService.open(
					goods.name, 
					{
						status: TuiNotification.Success, 
						label:"Товар успешно удален",
					}
					).subscribe();
					this.editedGoods = {} as Goods;
			},
			error: (error)  => 
			{
				this.alertService.open(
					"Обратитесь к администратору", 
					{
						status: TuiNotification.Error, 
						label:"Ошибка удаления услуги",
						autoClose: 5000,
					}
					).subscribe()
				console.log(error)
			}
		})
	}
}
