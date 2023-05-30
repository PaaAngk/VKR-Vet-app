import { Injectable } from "@angular/core";
import { EventInput } from "@fullcalendar/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { CreateReceptionRecordGQL, CreateReceptionRecordInput, DeleteReceptionRecordGQL, GetRecordsByDatesRangeGQL, ReceptionRecord, BetweenDateInput, UpdateDateReceptionRecordGQL, UpdateReceptionRecordGQL, UpdateReceptionRecordInput } from "src/graphql/generated";


@Injectable()
export class WorkScheduleService
{
    private _recordsList : BehaviorSubject<ReceptionRecord[]> = new BehaviorSubject([] as ReceptionRecord[]);
    // private _eventsList : BehaviorSubject<Array<EventInput>> = new BehaviorSubject([] as EventInput[]);

    // Selected date from calendar for create in dialog  
    private _selectedRecord : BehaviorSubject<ReceptionRecord> = new BehaviorSubject(undefined as unknown as ReceptionRecord);

    private _eventsList: Observable<EventInput[] | null> = this._recordsList.pipe(
        tap(i => console.log(i)),
        map(val => val.map((item: any) => {
            return {
                id: item.id.toString(),
                title: item.client?.fullName ? item.client?.fullName : (item.purpose?.purposeName ? item.purpose?.purposeName : "Нет данных"),
                start: item.dateTimeStart,
                end: item.dateTimeEnd,
            }
        })),
    )

    constructor(
      
        private createReceptionRecordGQL: CreateReceptionRecordGQL,
        private getRecordsByDatesRangeGQL:GetRecordsByDatesRangeGQL,
        private updateReceptionRecordGQL: UpdateReceptionRecordGQL,
        private deleteReceptionRecordGQL: DeleteReceptionRecordGQL,
        private updateDateReceptionRecordGQL: UpdateDateReceptionRecordGQL,
    ){
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for goods
     */
    get getEvents$(): Observable<EventInput[] | null>
    {
        // return this._eventsList.asObservable();
        return this._eventsList;
    }

    /**
     * Getter for selected date for create
     */
    get getSelectedDate$(): Observable<ReceptionRecord>
    {
        return this._selectedRecord.asObservable();
    }

    /**
     * Set record for create in dialog with preset value
     * @param data 
     */
    setSelectedReceptionRecord(data: ReceptionRecord)
    {
        this._selectedRecord.next(data);
    }

    /**
     * Search record in list of records
     * @param id Record id
     * @returns 
     */
    getLocalRecordById(id: number): ReceptionRecord{
        const data = this._recordsList.getValue().filter((item) => item.id === id)[0] || {} as ReceptionRecord
        return data
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get reception record by range datetime
     */
    getRecordsByDateRange(dates: BetweenDateInput): Observable<any>//BetweenDateInput
    {
        return this.getRecordsByDatesRangeGQL.watch({
            data: dates
        })
        .valueChanges.pipe(map(result => {
            // let events: EventInput[] = [];
            const newRecords = result.data?.receptionRecordBetweenDate             

            if(newRecords){
                const currentRecords = this._recordsList.getValue()
                this._recordsList.next(currentRecords.concat(newRecords.filter((item) => currentRecords.indexOf(item) < 0)));
                
            }
            console.log(result)
            console.log(dates)
        }))
    }

    /**
     * cre
     * @param data  Data for create
     * @returns 
     */
    createReceptionRecord(data: CreateReceptionRecordInput){
        return this.createReceptionRecordGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createReceptionRecord) {
                    this._recordsList.next(this._recordsList.getValue().concat(data.data?.createReceptionRecord))
                }
                return data.data?.createReceptionRecord
            })
        )
    }

    /**
     * Update record and update in list
     * @param id 
     * @param newRecord 
     * @returns 
     */
    updateReceptionRecord(id:number, newRecord : UpdateReceptionRecordInput){
        return this.updateReceptionRecordGQL.mutate({
            data: newRecord,
            receptionRecordId: id
        }).pipe(
            map(( {data} ) => {
                if (data?.updateReceptionRecord) {
                    this._recordsList.next(
                        this._recordsList.getValue().map(val => {
                            return val.id === data?.updateReceptionRecord.id ? data?.updateReceptionRecord : val
                        })
                    );
                }
            })
        )
    }

    
    /**
     * Update only dates in record and update list
     * @param id 
     * @param newRecord 
     * @returns 
     */
    updateDateReceptionRecord(id:number, newRecord : BetweenDateInput){
        return this.updateDateReceptionRecordGQL.mutate({
            data: newRecord,
            receptionRecordId: id
        }).pipe(
            map(( {data} ) => {
                if (data?.updateDateReceptionRecord) {
                    this._recordsList.next(
                        this._recordsList.getValue().map(val => {
                            return val.id === data?.updateDateReceptionRecord.id ? data?.updateDateReceptionRecord : val
                        })
                    );
                }
            })
        )
    }
    
    /**  
     * Delete record and remove from list
     * @param id id current rcord
     * @returns Observable of id deleted record
     */
    deleteReceptionRecord(id:number){
        return this.deleteReceptionRecordGQL.mutate({
            receptionRecordId: id
        }).pipe(
            map(( {data} ) => {
                if (data?.deleteReceptionRecord) {
                    this._recordsList.next(
                        this._recordsList.getValue().filter((item: ReceptionRecord) => item.id != id)
                    );
                }
            })
        )
    }
}