import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiContextWithImplicit, TuiDay, TuiDayLike, TuiDayRange, TuiMonth, tuiPure, TuiStringHandler, tuiWatch, TuiMapper } from '@taiga-ui/cdk';
import { TuiPoint, TUI_MONTHS } from '@taiga-ui/core';
import { TuiDayRangePeriod } from '@taiga-ui/kit';
import { map, Observable, of, Subject, take, takeUntil, tap } from 'rxjs';
import { BetweenDateInput } from 'src/graphql/generated';
import { ServicesAnalytics } from './analytics.service';
import { Statistic, StatisticByDates } from './types.interface';

const today = TuiDay.currentLocal();
const lastWeek = today.append({day: -7});
const lastTwoWeek = today.append({day: -14});
const lastMonth = today.append({month: -1});
const lastThreeMonth = today.append({month: -3, day:-1});

@Component({
	selector: 'vet-crm-analytics',
	templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements OnDestroy, OnInit{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _dates: Subject<TuiDayRange> = new Subject<TuiDayRange>();
	activeItemIndex = 0
	loading = false;
    currentDate = new Date();
    maxHeightYAxis:number = 0;
    axisYLabels:string[] = [];
    statisticFromCurrentPeriod:{pet:number, earn: number} = {pet:0, earn: 0};
    statisticFromServer:Statistic[][] = [];
    
	dateRange: TuiDayRange = {} as TuiDayRange;
    dateRangeNative: BetweenDateInput = {} as BetweenDateInput;
    readonly items = [
        new TuiDayRangePeriod(
            new TuiDayRange(lastWeek, today),
            'Неделя',
            ({$implicit}) => `Неделя (c ${$implicit.from})`,
        ),
        new TuiDayRangePeriod(
            new TuiDayRange(lastTwoWeek, today),
            'Две недели',
            ({$implicit}) => `Две недели (c ${$implicit.from})`,
        ),
        new TuiDayRangePeriod(
            new TuiDayRange(lastMonth, today),
            'Месяц',
            ({$implicit}) => `Месяц (c ${$implicit.from})`,
        ),
        new TuiDayRangePeriod(
            new TuiDayRange(lastThreeMonth, today),
            'Три месяца',
            ({$implicit}) => `Три месяца (c ${$implicit.from})`,
        ),
    ];

	readonly maxLength: TuiDayLike = {month: 6};
 

    get range(): TuiDayRange {
        return this.computeRange(this.dateRange);
    }

    statByDates: ReadonlyArray<ReadonlyArray<[TuiDay, number]>> = []

    constructor(
		private servicesAnalytics: ServicesAnalytics,
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TUI_MONTHS) private readonly months$: Observable<readonly string[]>,
    ) {
        this._dates.subscribe(dates => {
            this.dateRange = dates;
            this.dateRangeNative = {
                dateStart: dates.from.toLocalNativeDate(),
                dateEnd: dates.to.toLocalNativeDate()
            };
            this.servicesAnalytics.getEarnByDates(this.dateRangeNative).pipe(take(1)).subscribe();
        });
        this._dates.next(new TuiDayRange(
            lastTwoWeek, today,
        ));
        this.loading = true;
	}

    ngOnInit(): void
	{
        this.servicesAnalytics.getEarnByDates$
        .pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
        .subscribe({
            next: (data: StatisticByDates[]) => {
                if(data.length>0) {this.statByDates = this.getDaysArray(this.dateRangeNative, data); this.loading = false;}
                this._changeDetectorRef.markForCheck();
            },
            error: () => this.loading = false
        })
        
        this.servicesAnalytics.getStatistic()
        .pipe(tuiWatch(this._changeDetectorRef), takeUntil(this._unsubscribeAll))
        .subscribe({
            next: (data: Statistic[][]) => {
                this.statisticFromServer = data
                this._changeDetectorRef.markForCheck();
            },
        })

	}

	ngOnDestroy(): void
	{
        this.servicesAnalytics.clearOnDestroy();
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

    readonly toNumbers: TuiMapper<ReadonlyArray<[TuiDay, number]>, readonly TuiPoint[]> =
        (days, {from}: TuiDayRange) =>
            days.map(
                ([day, value]) =>
                    [TuiDay.lengthBetween(from, day), value] as [number, number],
            );
	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------
    
    @tuiPure
    computeYLabels$(maxXValue: number): readonly string[] {
        const arr: string[] = [];
        if ( maxXValue > 0){
            for(let x=0; x<=maxXValue; x+=maxXValue/4){
                arr.push(Math.round(x).toString());
            }
        }
        return arr
    }


    @tuiPure
    getDate(day: TuiDay | number, date: TuiDay): TuiDay {
        return day instanceof TuiDay ? day : date.append({day});
    }

    @tuiPure
    getWidth({from, to}: TuiDayRange): number {
        return TuiDay.lengthBetween(from, to);
    }
    @tuiPure
    private computeRange(range: TuiDayRange): TuiDayRange {
        const {from, to} = range;
        const length = TuiDay.lengthBetween(from, to);
        const dayOfWeekFrom = from.dayOfWeek();
        const dayOfWeekTo = to.dayOfWeek();
        const mondayFrom = dayOfWeekFrom ? from.append({day: 7 - dayOfWeekFrom}) : from;
        const mondayTo = dayOfWeekTo ? to.append({day: 7 - dayOfWeekTo}) : to;
        const mondaysLength = TuiDay.lengthBetween(mondayFrom, mondayTo);
 
        if (length > 60) {
            return new TuiDayRange(
                mondayFrom,
                mondayTo.append({day: mondaysLength % 14}),
            );
        }
 
        if (length > 14) {
            return new TuiDayRange(mondayFrom, mondayTo);
        }
 
        if (length > 7) {
            return new TuiDayRange(from, to.append({day: length % 2}));
        }
 
        return range;
    }
 
    // Complete space between dates and calc max sum
    private getDaysArray(dates: BetweenDateInput, data: StatisticByDates[]):ReadonlyArray<ReadonlyArray<[TuiDay, number]>> {
        const arrCost: [TuiDay, number][] = [];
        const arrUnique_pets: [TuiDay, number][] = [];
        const arrUnique_client: [TuiDay, number][] = [];
        let petsCount = 0;
        let earnCount = 0;
        this.maxHeightYAxis = 0;
        for(let dt:Date=dates.dateStart; dt<=dates.dateEnd; dt.setDate(dt.getDate()+1)){
            const finded_date = data.find(val => new Date(val.date).toDateString() === new Date(dt).toDateString())
            if (finded_date) {
                arrCost.push([TuiDay.fromLocalNativeDate(dt), finded_date.cost_sum]);
                arrUnique_pets.push([TuiDay.fromLocalNativeDate(dt), finded_date.unique_pets*300]);
                arrUnique_client.push([TuiDay.fromLocalNativeDate(dt), finded_date.unique_client*300]);
                if (finded_date.cost_sum > this.maxHeightYAxis) this.maxHeightYAxis = finded_date.cost_sum;
                petsCount += finded_date.unique_pets;
                earnCount += finded_date.cost_sum;
            }
            else {
                arrCost.push([TuiDay.fromLocalNativeDate(dt), Math.floor(randn_bm()*3000)]);
                arrUnique_pets.push([TuiDay.fromLocalNativeDate(dt), Math.floor(randn_bm()*100)*300]);
                arrUnique_client.push([TuiDay.fromLocalNativeDate(dt), Math.floor(randn_bm()*100)*300])
            }
            
        }
        this.statisticFromCurrentPeriod = {pet:petsCount, earn:earnCount}
        const arrSum: [TuiDay, number][][] = [arrCost, arrUnique_pets, arrUnique_client];
        return arrSum;
    }

    readonly hintContent = ({
        $implicit,
    }: TuiContextWithImplicit<readonly TuiPoint[]>): string => `${$implicit[0][1]} ₽`;

    onDateRangeChange(dates: TuiDayRange){
        this._dates.next(dates)
    }
   
}
function randn_bm(): number {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }
  