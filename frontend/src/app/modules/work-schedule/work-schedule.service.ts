import { Injectable } from "@angular/core";
import { EventInput } from "@fullcalendar/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { fullNameToShort } from "src/app/shared/utils/fullNameToShort";
import { BetweenDateInput, WorkSchedule, GetWorkSchedulesBetweenDateGQL, CreateWorkScheduleGQL, DeleteWorkScheduleGQL, CreateWorkScheduleInput, DeleteWorkScheduleAllByIdGQL } from "src/graphql/generated";


@Injectable({
    providedIn: 'root'
})
export class WorkScheduleService
{
    private _scheduleList : BehaviorSubject<WorkSchedule[] | null> = new BehaviorSubject<WorkSchedule[]|null>(null);

    private _eventsList: Observable<EventInput[] | null> = this._scheduleList.pipe(
        // tap(c=>console.log(c)),
        map(val => {
            if(val){
                return val.map((item: WorkSchedule) => {
                    return {
                        id: item.id.toString(),
                        title: fullNameToShort(item.employee?.fullName||''),
                        date: item.date,
                        groupId: String(item.employee?.id)
                    }
                })
            } else return null;
        }),
    )

    constructor(
        private getWorkSchedulesBetweenDateGQL: GetWorkSchedulesBetweenDateGQL,
        private createWorkScheduleGQL: CreateWorkScheduleGQL,
        private deleteWorkScheduleGQL:DeleteWorkScheduleGQL,
        private deleteWorkScheduleAllByIdGQL:DeleteWorkScheduleAllByIdGQL
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get reception record by range datetime
     */
    getRecordsByDateRange(dates: BetweenDateInput): Observable<WorkSchedule[]>
    {
        this._scheduleList.next(null)
        return this.getWorkSchedulesBetweenDateGQL.watch({
            data: dates
        }, {fetchPolicy: 'network-only'}
        )
        .valueChanges.pipe(map(result => {
            const schedule = result.data?.getWorkSchedulesBetweenDate             

            if(schedule) {
                const currentRecords = this._scheduleList.getValue() || []
                this._scheduleList.next(currentRecords.concat(schedule.filter((item) => currentRecords.indexOf(item) < 0)));
            }
            return schedule
        }))
    }

    /**
     * create date by first date, count of days for adding and employee
     * @param data  Data for create
     * @returns 
     */
    createReceptionRecord(data: CreateWorkScheduleInput){
        return this.createWorkScheduleGQL.mutate({
            data: data
        }).pipe(
            map(( result ) => {
                if (result.data?.createWorkSchedule) {
                    const currentRecords = this._scheduleList.getValue() || [];
                    this._scheduleList.next(currentRecords.filter(val => val.employee?.id !== data.employeeId).concat(result.data?.createWorkSchedule));
                    return result.data?.createWorkSchedule;
                }
                return data
            })
        )
    }
    
    /**  
     * Delete schedule all records be employee id
     * @param id id current rcord
     * @returns Observable of id deleted schedule
     */
    deleteScheduleAllById(employeeId:number){
        return this.deleteWorkScheduleAllByIdGQL.mutate({
            employeeId: employeeId
        }, {fetchPolicy: 'network-only'}).pipe(
            map(( {data} ) => {
                if (data?.deleteWorkScheduleAllEmployeeById) {
                    const currentRecords = this._scheduleList.getValue() || []
                    this._scheduleList.next(
                        currentRecords.filter((item: WorkSchedule) => item.employee?.id != employeeId)
                    );
                }
            })
        )
    }

    /**  
     * Delete schedule all records be employee id
     * @param id id current rcord
     * @returns Observable of id deleted schedule
     */
    deleteScheduleById(id:number){
        return this.deleteWorkScheduleGQL.mutate({
            workScheduleId: id
        }, {fetchPolicy: 'network-only'}).pipe(
            map(( {data} ) => {
                if (data?.deleteWorkScheduleById) {
                    const currentRecords = this._scheduleList.getValue() || []
                    this._scheduleList.next(
                        currentRecords.filter((item: WorkSchedule) => item.id != id)
                    );
                }
            })
        )
    }
}
