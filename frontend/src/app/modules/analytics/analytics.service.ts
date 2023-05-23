import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { BetweenDateInput, ServiceType } from "src/graphql/generated";
import { environment } from "src/environments/environment"
import { Statistic, StatisticByDates } from "./types.interface";


@Injectable({
    providedIn: 'root'
})
export class ServicesAnalytics
{
    private _earnByDates : BehaviorSubject<Array<StatisticByDates>> = new BehaviorSubject([] as StatisticByDates[]);
    private _serviceTypesList : BehaviorSubject<Array<ServiceType>> = new BehaviorSubject([] as ServiceType[]);


    constructor(
        private http: HttpClient,
    ){
        console.log("Provide")
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for services
     */
    get getEarnByDates$(): Observable<Array<StatisticByDates>>
    {
        return this._earnByDates.asObservable();
    }

    /**
     * Getter for service types
     */
    get getServiceTypes$(): Observable<ServiceType[]>
    {
        return this._serviceTypesList.asObservable();
    }

    clearOnDestroy(){
        this._earnByDates.next([]);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all cost in date with date range
     */
    getEarnByDates(dates: BetweenDateInput): Observable<StatisticByDates[]>
    {
        return this.http.post<StatisticByDates[]>(`${environment.api_url}/analytics/analytics-by-dates`, dates)
        .pipe(map(data => {this._earnByDates.next(data); return data}))
    }

    getStatistic(): Observable<Statistic[][]>
    {
        return this.http.get<Statistic[][]>(`${environment.api_url}/analytics/analytics`)
    }
    
}
