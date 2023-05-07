import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CreateReceptionRecordGQL, CreateReceptionRecordInput, DeleteGoodsGQL, GetAllGoodsGQL, Goods, ReceptionRecord, UpdateGoodsGQL, UpdateGoodsInput } from "src/graphql/generated";
import { DateRangeParams } from "./interfaces";


@Injectable()
export class SchedulerService
{
    private _goodsList : BehaviorSubject<Array<Goods>> = new BehaviorSubject([] as Goods[]);
    
    private _recordsList : BehaviorSubject<Array<ReceptionRecord>> = new BehaviorSubject([] as ReceptionRecord[]);

    // Selected date for create from calendar 
    private _selectedDateForCreate : BehaviorSubject<DateRangeParams> = new BehaviorSubject(undefined as unknown as DateRangeParams);

    constructor(
        private getAllGoodsGQL: GetAllGoodsGQL,
        private updateGoodsGQL: UpdateGoodsGQL,
        private deleteGoodsGQL: DeleteGoodsGQL,
        
        private createReceptionRecordGQL: CreateReceptionRecordGQL,
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

    /**
     * Getter for selected date for create
     */
    get getSelectedDate$(): Observable<DateRangeParams>
    {
        return this._selectedDateForCreate.asObservable();
    }

    setSelectedDate(date: DateRangeParams)
    {
        this._selectedDateForCreate.next(date);
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

    createReceptionRecord(data: CreateReceptionRecordInput){
        return this.createReceptionRecordGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createReceptionRecord) {
                    console.log(data)
                    // this._goodsList.next(this._goodsList.getValue().concat(data.data?.));
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
