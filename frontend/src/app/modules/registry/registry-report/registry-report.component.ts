import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import {
    TuiDay,
    TUI_DATE_FORMAT, 
    TuiDayRange,
    TUI_FIRST_DAY,
} from '@taiga-ui/cdk';
import {  BehaviorSubject, Observable, pipe, Subject, timer } from 'rxjs';
import { takeUntil, filter, map} from 'rxjs/operators';
import { TableColumn } from '@core/models'
import { FormControl, FormGroup } from '@angular/forms';
import { RegistryService } from 'src/app/modules/registry/registry.service';
import { User } from '../registry.types';
import { defaultDayRangePeriods } from 'src/app/shared/utils/default-day-range-periods';
import { TuiDayRangePeriod } from '@taiga-ui/kit';

@Component({
  selector: 'registry-report',
  templateUrl: './registry-report.component.html',
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: `YMD`},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryReportComponent implements OnInit {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    readonly tableColumns: TableColumn[] = [
        {
            name: 'Ид',
            dataKey: '_id'
        },
        {
            name: 'Индекс',
            dataKey: 'index'
        },
        {
            name: 'Имя',
            dataKey: 'name'
        },
        {
            name: 'Дата регистрации',
            dataKey: 'registered'
        }
    ]

    readonly itemsCalendarVariants: readonly TuiDayRangePeriod[] = [
        defaultDayRangePeriods()
    ][0];

    nameList : any;
    readonly filterForm = new FormGroup({
        dataRange : new FormControl(
            new TuiDayRange(TUI_FIRST_DAY, TuiDay.currentLocal())
        ), 
        index : new FormControl(null),
        name : new FormControl(null)
    });

    filterSideBarVisible: boolean = false;
    menuSidebarVisible: boolean = true;
    search = '';

    // Inject column editor button in parent template
    columnEditorTemplate:any;
    setColumnEditorTemplate(templateRef: TemplateRef<any>) {
        this.columnEditorTemplate = templateRef;
        this._changeDetectorRef.markForCheck();
    }

    users : User[];
    filteredUsers : BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _registryService: RegistryService
    ) { }

    ngOnInit() {
        //Getting data and insert its in filteredUsers variable by filterUser method
        this._registryService.userData$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((users : User[]) => {
            this.users = users;
            this.filterUser(null);
            this._changeDetectorRef.markForCheck();
        });

        this.filterForm.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(value => {
            this.filterUser(value),
            this._changeDetectorRef.markForCheck()
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(undefined);
        this._unsubscribeAll.complete();
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter the users
     * @param query any
     */
    filterUser(query: any): void
    {
        // Reset the filter
        if ( !query )
        {
            this.filteredUsers.next(this.users);
            this.nameList = [...new Set(this.users.map(item => item.name))];
            return;
        }

        let filterItems = this.users;
        if(query.dataRange){
            filterItems = filterItems.filter(user => dateCompare(user.registered, query.dataRange));
        }
        if(query.index){
            filterItems = filterItems.filter(user => user.index === query.index );
        }
        if(query.name){
            filterItems = filterItems.filter(user => user.name.trim().toLowerCase().includes(query.name.trim().toLowerCase()) );
        }
        
        this.filteredUsers.next(filterItems);
    }

    /**
     * Menu items list
     */
    menuItem = [
        {
            item:"Реестр на дату"
        },
        {
            item:"Отчет 1"
        },
        {
            item:"Отчет 2"
        },
        {
            item:"Отчет 3"
        },
        {
            item:"Отчет 4"
        },
        {
            item:"Отчет 5"
        }
    ]
    currentMenuItem = "Реестр на дату"
    setCurrentMenuItem(item : string){
        this.currentMenuItem = item
    }

}

/**
* Getting data from string
*
* @param date string
*/
function getTuiDate(date : string) : TuiDay{
    let parseDate = date.trim().split('-')
    //console.log(new TuiDay(Number(parseDate[0]), Number(parseDate[1]), Number(parseDate[2])), "    ", date)
    return new TuiDay(parseInt(parseDate[0]), parseInt(parseDate[1]), parseInt(parseDate[2]))
}

/**
* Comparing date - string and date - TuiDayRange
* 
* @param day string
* @param dataRange TuiDayRange | null
*/
function dateCompare(day: string, dataRange: TuiDayRange | undefined): Boolean{
    let check = getTuiDate(day) >= dataRange!.from.append({month: 1}) && getTuiDate(day) <= dataRange!.to.append({month: 1})
    // if (check) {
    //   console.log(day, "  ", dataRange, "/  ", getTuiDate(day) >= dataRange!.from && getTuiDate(day) <= dataRange!.to)
    // }
    return check
}