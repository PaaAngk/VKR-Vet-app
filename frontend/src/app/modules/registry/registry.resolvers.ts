import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegistryService } from 'src/app/modules/registry/registry.service';
import { Riur, User } from './registry.types';

@Injectable({
    providedIn: 'root'
})
export class RegistrySearchResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private  _registryService : RegistryService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Riur[]> | any
    {
        // let query = route.queryParams['regSection'] == 'real-estate'  ? '': `?category=${route.queryParams['regSection']}`
        // return this._registryService.getSearchData(query);
        let query = route.paramMap.get('section') == 'real-estate'  ? '': `?category=${route.paramMap.get('section')}`
        return this._registryService.getSearchData(query)
        .pipe(
            // Error here means the requested chat is not available
            catchError((error) => {
                console.error(error);

                // Get the parent url
                const parentUrl = state.url.split('/').slice(0, -1).join('/');
                this._router.navigateByUrl(parentUrl);
                return throwError(error);
            })
        );
        //return query
    }
}

@Injectable({
    providedIn: 'root'
})
export class RegistryReportResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private  _registryService : RegistryService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>
    {
        return this._registryService.getUsersData();
    }
}
