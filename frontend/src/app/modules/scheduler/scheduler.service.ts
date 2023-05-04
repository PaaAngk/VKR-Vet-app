import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CreateGoodsGQL, CreateGoodsInput, DeleteGoodsGQL, GetAllGoodsGQL, Goods, UpdateGoodsGQL, UpdateGoodsInput } from "src/graphql/generated";


@Injectable()
export class SchedulerService
{
    private _goodsList : BehaviorSubject<Array<Goods>> = new BehaviorSubject([] as Goods[]);

    constructor(
        private getAllGoodsGQL: GetAllGoodsGQL,
        private createGoodsGQL : CreateGoodsGQL,
        private updateGoodsGQL: UpdateGoodsGQL,
        private deleteGoodsGQL: DeleteGoodsGQL,
    ){
        this.getAllGoods();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for goods
     */
    get getGoods$(): Observable<Goods[]>
    {
        return this._goodsList.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all goods
     */
    getAllGoods(): void
    {
        this.getAllGoodsGQL.watch()
        .valueChanges.subscribe({
            next : (data) => {
                this._goodsList.next(data.data.allGoods)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }

    /**
     * Query for goods create
     * @param data CreateGoodsInput 
     * @returns Observable of created good
     */
    createGoods(data: CreateGoodsInput){
        return this.createGoodsGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createGoods) {
                    this._goodsList.next(this._goodsList.getValue().concat(data.data?.createGoods));
                }
            })
        )
    }

    /**
     * Update good and replace updated in goodsList
     * @param id id current good
     * @param newGoods UpdateGoodsInput new good data
     * @returns Observable of updated g oods
     */
    updateGoods(id:number, newGoods : UpdateGoodsInput){
        console.log(newGoods)
        return this.updateGoodsGQL.mutate({
            data: newGoods,
            goodsId: id
        }).pipe(
            map(( {data} ) => {
                if (data?.updateGoods) {
                    this._goodsList.next(
                        this._goodsList.getValue().map(val => {
                            return val.id === data?.updateGoods.id ? data?.updateGoods : val
                        })
                    );
                }
            })
        )
    }

    /**
     * Delete good and remove from list
     * @param id id current good
     * @returns Observable of deleted good
     */
    deleteGoods(id:number){
        return this.deleteGoodsGQL.mutate({
            goodsId: id
        }).pipe(
            map(( {data} ) => {
                if (data?.deleteGoods) {
                    this._goodsList.next(
                        this._goodsList.getValue().filter((item: Goods) => item.id != id)
                    );
                }
            })
        )
    }
}
