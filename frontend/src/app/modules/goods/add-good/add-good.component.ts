import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiWatch } from '@taiga-ui/cdk';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { CreateGoodsInput, GetAllGoodsCategoryGQL, GoodsCategory } from 'src/graphql/generated';
import { GoodsService } from '../goods.service';

@Component({
  selector: 'vet-crm-add-goods',
  templateUrl: './add-good.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGoodsComponent implements OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    goodsCategoryList : GoodsCategory[] = [];
    submitLoader= false;

    measure = ['Ампула', 'Доза', 'Мл', 'Флакон', 'Штука', 'Таблетка', "Бутылка", "Грамм", "Кг", "Пара"];
	
	readonly addGoodsForm = new FormGroup({
		name: new FormControl(null as unknown as string, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
		categoryId: new FormControl(null as unknown as number),
		price: new FormControl(null as unknown as number, [Validators.required]),
        quantity: new FormControl(null as unknown as number, [Validators.required]),
        measure: new FormControl(null as unknown as string, [Validators.required]),
        category: new FormControl(null as unknown as GoodsCategory, [Validators.required]),
	});

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, number>,
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        private _changeDetectorRef: ChangeDetectorRef,
        private getAllGoodsCategoryGQL: GetAllGoodsCategoryGQL,
        private goodsService: GoodsService,
    ) {
        this.getAllGoodsCategoryGQL.watch()
        .valueChanges.pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
        .subscribe({
            next: (data) => {
                this.goodsCategoryList = data.data.allGoodsCategory;
            }
        })
    }

    ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

    get hasValue(): boolean {
        return this.addGoodsForm.status == "VALID" ? true : false;
    }

    get data(): number {
        return this.context.data;
    }

    readonly stringifyCategory = (item: GoodsCategory): string => `${item.categoryName}`;

    submit(): void {
        if (this.addGoodsForm.status == "VALID") {
            this.submitLoader = true;
            this.addGoodsForm.value.categoryId = this.addGoodsForm.value.category?.id
            delete this.addGoodsForm.value.category

            this.goodsService.createGoods(this.addGoodsForm.value as CreateGoodsInput).subscribe({
                next: () => {
                    this.alertService.open(
                        "", 
                        {status: TuiNotification.Success, label:"Товар успешно добавлен!"}
                        ).subscribe();
                    this.context.completeWith(this.addGoodsForm.value); 
                    this.submitLoader = false;
                },
                error: (error)  => 
                {
                    this.alertService.open(
                        "Товар уже есть в базе данных. Попробуйте найти товар или перезагрузите страницу.", 
                        {status: TuiNotification.Error, label:"Ошибка добавления товара"}
                    ).subscribe();
                    console.log(error);
                    this.submitLoader = false;
                }
            })
        }
    }
}
