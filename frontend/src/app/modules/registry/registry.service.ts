import { RegistryModule } from './registry.module';
import { ApiService } from '@core/services';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Riur, User } from './registry.types';
import { ActivatedRoute } from '@angular/router';
import { DynamicFilterBase } from '@shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { DynamicFilterService } from 'src/app/shared/components/advanced-dynamic-filter/dynamic-filter.service';

@Injectable({
    providedIn: 'root'
})
// @Injectable({
// 	providedIn: RegistryModule
// })
export class RegistryService
{
    private _activeAdvancedFilter: BehaviorSubject<DynamicFilterBase<string|string[]|number>[]> = new BehaviorSubject([] as DynamicFilterBase<string|string[]|number>[]);
    private _searchData: BehaviorSubject<Riur[]> = new BehaviorSubject([] as Riur[]);
    private _userData: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private dynamicFilterService: DynamicFilterService
    )
    {
    } 

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for search data
     */
    get searchData$(): Observable<Riur[]>
    {
        return this._searchData.asObservable();
    }

    /**
     * Getter for advanced filter of search data
     */
     get activeAdvancedFilter$(): Observable<DynamicFilterBase<any>[]>
     {
         return this._activeAdvancedFilter.asObservable();
     }
 

    /**
     * Getter for user data
     */
    get userData$(): Observable<User[]>
    {
        return this._userData.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get registry search data
     */
    getSearchData(query : string): Observable<any>
    {
        this._activeAdvancedFilter.next(this.dynamicFilterService.getFilter(query))
        return this._httpClient.get<Riur[]>(`http://localhost:3000/real-estate${query}`).pipe(
            tap((response: Riur[]) => {
                if(!response){
                    response = []
                }
                this._searchData.next(response);
            })
        );

        // return this._httpClient.get<Riur[]>(`http://localhost:3000/real-estate${query}`)
        // .pipe(map(response => {
        //     this._searchData.next(response);
        //     if(!response){
        //         return [] as Riur[]
        //     }
        //     return response;
        // }));
    }

    /**
     * Get registry user data
     */
     getUsersData(): Observable<User[]>
     {
         return this._httpClient.get<User[]>('http://localhost:3000/sampleWithData').pipe(
             tap((response: User[]) => {
                //timer(3000).subscribe(dta => {this._userData.next(response), console.log(":fetch") });
                this._userData.next(response)
             })
         );
     }

    /**
     * Reset the registry search data
     */
    resetSearcData(): void
    {
        this._searchData.next([] as Riur[]);
    }
}
