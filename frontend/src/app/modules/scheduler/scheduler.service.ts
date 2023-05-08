import { Injectable } from "@angular/core";
import { EventInput } from "@fullcalendar/core";
import { BehaviorSubject, delay, map, Observable, of, Subject, tap } from "rxjs";
import { CreateReceptionRecordGQL, CreateReceptionRecordInput, GetRecordsByDatesRangeGQL, ReceptionRecord, ReceptionRecordBetweenDateInput } from "src/graphql/generated";


@Injectable()
export class SchedulerService
{
    readonly searchEvents$ = new Subject<ReceptionRecordBetweenDateInput>();
    
    private _recordsList : BehaviorSubject<ReceptionRecord[]> = new BehaviorSubject([] as ReceptionRecord[]);
    private _eventsList : BehaviorSubject<Array<EventInput>> = new BehaviorSubject([] as EventInput[]);
    // Selected date for create from calendar 
    private _selectedDateForCreate : BehaviorSubject<ReceptionRecordBetweenDateInput> = new BehaviorSubject(undefined as unknown as ReceptionRecordBetweenDateInput);
    

    // eventsList: Observable<EventInput[] | null> = this.searchEvents$.pipe(
    //     filter(value => value !== null),
    //     switchMap(search =>
    //         this.schedulerService.getRecordsByDatesRange(search).pipe(startWith(null)),
    //     ),
    //     startWith(null),
    // );


    constructor(
      
        private createReceptionRecordGQL: CreateReceptionRecordGQL,
        private GetRecordsByDatesRange:GetRecordsByDatesRangeGQL
    ){
        this._recordsList.subscribe( (data: ReceptionRecord[]) => {
            console.log(data)
            this._eventsList.next(data.map((item: any) => {
                return {
                    id: item.id.toString(),
                    title: item.client?.fullName ? item.client?.fullName : (item.purpose?.purposeName ? item.purpose?.purposeName : "Нет данных"),
                    start: item.dateTimeStart,
                    end: item.dateTimeEnd,
                } ;
            }))
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for goods
     */
    get getEvents$(): Observable<EventInput[]>
    {
        return this._eventsList.asObservable();
    }

    /**
     * Getter for selected date for create
     */
    get getSelectedDate$(): Observable<ReceptionRecordBetweenDateInput>
    {
        return this._selectedDateForCreate.asObservable();
    }

    setSelectedDate(date: ReceptionRecordBetweenDateInput)
    {
        this._selectedDateForCreate.next(date);
    }

    getLocalRecordById(id: number): ReceptionRecord{
        const data = this._recordsList.getValue().filter((item) => item.id === id)[0] || {} as ReceptionRecord
        return data
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all goods
     */
    getRecordsByDatesRange(data: ReceptionRecordBetweenDateInput): Observable<any>//ReceptionRecordBetweenDateInput
    {
        return this.GetRecordsByDatesRange.watch({
            data: data
        })
        .valueChanges.pipe(map(data => {
            // let events: EventInput[] = [];
            const newRecords = data.data?.receptionRecordBetweenDate             

            if(newRecords){
                const fun = async () => {
                    const currentRecords = this._recordsList.getValue()
                    this._recordsList.next(currentRecords.concat(newRecords.filter((item) => currentRecords.indexOf(item) < 0)));
                    console.log(this._recordsList.getValue())
                } 
                fun();
            }
        }))
    }

    createReceptionRecord(data: CreateReceptionRecordInput){
        return this.createReceptionRecordGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createReceptionRecord) {
                    console.log(data)
                    this._recordsList.next(this._recordsList.getValue().concat(data.data?.createReceptionRecord))
                }
                return data.data?.createReceptionRecord
            })
        )
    }




    // /**
    //  * Update good and replace updated in goodsList
    //  * @param id id current good
    //  * @param newGoods UpdateGoodsInput new good data
    //  * @returns Observable of updated g oods
    //  */
    // updateGoods(id:number, newGoods : UpdateGoodsInput){
    //     console.log(newGoods)
    //     return this.updateGoodsGQL.mutate({
    //         data: newGoods,
    //         goodsId: id
    //     }).pipe(
    //         map(( {data} ) => {
    //             if (data?.updateGoods) {
    //                 this._goodsList.next(
    //                     this._goodsList.getValue().map(val => {
    //                         return val.id === data?.updateGoods.id ? data?.updateGoods : val
    //                     })
    //                 );
    //             }
    //         })
    //     )
    // }

    // /**
    //  * Delete good and remove from list
    //  * @param id id current good
    //  * @returns Observable of deleted good
    //  */
    // deleteGoods(id:number){
    //     return this.deleteGoodsGQL.mutate({
    //         goodsId: id
    //     }).pipe(
    //         map(( {data} ) => {
    //             if (data?.deleteGoods) {
    //                 this._goodsList.next(
    //                     this._goodsList.getValue().filter((item: Goods) => item.id != id)
    //                 );
    //             }
    //         })
    //     )
    // }
}
