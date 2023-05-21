import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay, TuiDayLike, TuiDayRange, TuiMonth, tuiPure, TuiStringHandler, TUI_IS_CYPRESS } from '@taiga-ui/cdk';
import { TUI_MONTHS } from '@taiga-ui/core';
import { map, Observable, Subject } from 'rxjs';
import { ServicesAnalytics } from './analytics.service';


@Component({
	selector: 'vet-crm-analytics',
	templateUrl: './analytics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	activeItemIndex = 0
	loading = false;

	range = new TuiDayRange(
        TuiDay.currentLocal(),
        TuiDay.currentLocal().append({year: 1}),
    );

	readonly maxLength: TuiDayLike = {month: 12};
 
    readonly xStringify$: Observable<TuiStringHandler<TuiDay>> = this.months$.pipe(
        map(
            months =>
                ({month, day}) =>
                    `${months[month]}, ${day}`,
        ),
    );

    constructor(
		private servicesAnalytics: ServicesAnalytics,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
        @Inject(TUI_IS_CYPRESS) readonly isCypress: boolean,
    ) {
		// Getting data 
		// this.loading = true;
		// this.servicesService.getServices$
		// .pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
		// .subscribe((services: Service[]) => {	
		// 	this.loading = false;
		// 	this.services = services;
		// 	this.filterServices = this.setFilterServices(this.searchForm.value['search']);
		// });
	}

	ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	get value(): ReadonlyArray<[TuiDay, number]> {
        return this.computeValue(this.range);
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
	
	@tuiPure
    computeLabels$({from, to}: TuiDayRange): Observable<readonly string[]> {
        return this.months$.pipe(
            map(months =>
                Array.from(
                    {length: TuiMonth.lengthBetween(from, to) + 1},
                    (_, i) => months[from.append({month: i}).month],
                ),
            ),
        );
    }
 
    readonly yStringify: TuiStringHandler<number> = y =>
        `${(10 * y).toLocaleString('en-US', {maximumFractionDigits: 0})} $`;
 
    @tuiPure
    private computeValue({from, to}: TuiDayRange): ReadonlyArray<[TuiDay, number]> {
        return new Array(TuiDay.lengthBetween(from, to) + 1)
            .fill(0)
            .reduce<ReadonlyArray<[TuiDay, number]>>(
                (array, _, i) => [
                    ...array,
                    [
                        from.append({day: i}),
                        this.isCypress
                            ? 100
                            : (i ? array[i - 1][1] : 100) + Math.random() * 10 - 5,
                    ],
                ],
                [],
            );
    }

   
}
