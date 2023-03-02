import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { TuiComparator, tuiDefaultSort } from '@taiga-ui/addon-table';
import { TuiValidationError, tuiWatch } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import { PolymorpheusComponent, PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
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
	readonly options = {updateOn: 'blur'} as const;

	goods : Goods[] = [] as Goods[];
	filteredGoods : Goods[] = [] as Goods[];
	editedGoods: Goods = {} as Goods;
	editQuantityGoods: Goods = {} as Goods;
	newQuantity:number | null = null;
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
        key: K | string,
    ): void {
		this.editedGoods =  {...this.editedGoods, [key]: value};
    }

	editQuantityValueChange(value: number){
		this.newQuantity = value;
	}

	readonly stringValue: ValidatorFn = ({value}) =>
		value.length > 2 ? 
			null 
			: 
			{stringValue: 'Name must be string'};
	
	readonly notNullValidator: ValidatorFn = ({value}) =>
		value !== null ? 
			null 
			: 
			{notNullValidator: 'Value must be above 0'};

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
					"Проверьте правильность введенных данных", 
					{
						status: TuiNotification.Error, 
						label:"Ошибка обновления товара",
						autoClose: 5000,
					}
					).subscribe()
				console.log(error)
			}
		})
	}	

	deleteGoods(goods : Goods, content: PolymorpheusContent<TuiDialogContext>){
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.dialogService.open(content,{
			label: 'Подтвердите удаление товара - '+ goods.name,
			size: 's',
		})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
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
				_unsubscribeDialog.next(undefined);
				_unsubscribeDialog.complete();
			}
		});
		
	}

	editQuantity(action:string, content: PolymorpheusContent<TuiDialogContext>, goods: Goods){
		//For delete dialog after success update
		const _unsubscribeDialog: Subject<any> = new Subject<any>();

		this.editQuantityGoods = goods;
		this.dialogService.open(content,{
			label: action+' товара',
			size: 's',
		})
		.pipe(takeUntil(_unsubscribeDialog))
		.subscribe({
			next: () =>{
				if(!this.newQuantity){
					this.alertService.open(
						"Введите количество добавления/списания", 
						{
							status: TuiNotification.Error, 
							label:"Ошибка обновления товара",
							autoClose: 5000,
						}
					).subscribe()
				}
				else if(
					action != 'Списание' || 
					((this.editQuantityGoods.quantity || 0) - this.newQuantity) >= 0)
				{
					this.goodsService.updateGoods(
						this.editQuantityGoods.id, 
						{
							name: this.editQuantityGoods.name, 
							price: this.editQuantityGoods.price,
							quantity: action == 'Приход' ? 
								(this.editQuantityGoods.quantity || 0) + this.newQuantity
								:
								(this.editQuantityGoods.quantity || 0) - this.newQuantity
						} as UpdateGoodsInput
					).subscribe({
						next: () => { 
							this.alertService.open(
								"", 
								{
									status: TuiNotification.Success, 
									label: action + ' товара оформлен!',
								}).subscribe();
								this.editQuantityGoods = {} as Goods;
								this.newQuantity = null;
								this.updateLoading = false;
								_unsubscribeDialog.next(undefined);
								_unsubscribeDialog.complete();
						},
						error: (error)  => 
						{
							this.alertService.open(
								"Проверьте правильность введенных данных", 
								{
									status: TuiNotification.Error, 
									label:"Ошибка обновления товара",
									autoClose: 5000,
								}
							).subscribe()
							this.editQuantityGoods = {} as Goods;
							this.newQuantity = null;
							console.log(error);
						}
					})
				}
				else{
					this.alertService.open(
						"Недостаточно товара для списания", 
						{
							status: TuiNotification.Error, 
							label:"Ошибка обновления товара",
							autoClose: 5000,
						}
					).subscribe()
				}
			},
			complete: () => {
				this.editQuantityGoods = {} as Goods;
				this.newQuantity = null;
			}
		});
	}
}
