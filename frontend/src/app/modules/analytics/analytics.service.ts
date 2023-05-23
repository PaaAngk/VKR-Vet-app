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

    constructor(
        private http: HttpClient,
    ){
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for 
     */
    get getEarnByDates$(): Observable<Array<StatisticByDates>>
    {
        return this._earnByDates.asObservable();
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

    // Get statistic (sum of earn, count of clients and pets(unique)) to today and yesterday
    getStatistic(): Observable<Statistic[][]>
    {
        return this.http.get<Statistic[][]>(`${environment.api_url}/analytics/analytics`)
    }
    
}
