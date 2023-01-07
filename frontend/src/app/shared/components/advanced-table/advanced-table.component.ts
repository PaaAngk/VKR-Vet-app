import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {tuiDefaultSort, TuiComparator} from '@taiga-ui/addon-table';
import { tuiIsPresent, TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
    debounceTime,
    filter,
    map,
    share,
    startWith,
    switchMap,
} from 'rxjs/operators';
import { TableColumn } from 'src/app/core';
 

@Component({
  selector: 'advanced-table',
  templateUrl: './advanced-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedTableComponent implements OnInit {
    readonly options = {updateOn: `blur`} as const;

    moid = 0;
    moid1 = 0;
    moid2 = 0;
    moid3 = 0;

    columnNames : readonly string[] = [''];
    enabled!: readonly string[];
    columnKeys : string[] = [''];
    KEYS!: Record<string, string>;
    readonly arrow = TUI_ARROW;
    
    // Data for table from parent component
    @Input()
    DATA!: Observable<any[]>;

    // Set searching query from parent component 
    /*<tui-input
        class="w-96"
        [tuiTextfieldCleaner]="true"
        [(ngModel)]="search"
    >
        Поиск в таблице
    </tui-input>*/
    @Input() search = '';
    
    // Pass the column information to the table
    @Input() tableColumns!: TableColumn[];

    // Icon going to be embedded in first row for action. Ex.:tuiIconExternal
    @Input() rowActionIcon: string = '';

    // Text going to be embedded in first row for action. Ex.:tuiIconExternal
    @Input() rowActionText: string = '';

    // Enable column resize on width
    @Input() resizableColumn = false;

    // Enable column header visible on scroll
    @Input() stickyColumn = false;

    // Set default sorting on column by column key  
    @Input() sortByColumnKey = '';

    // Output for pass value of action row
    @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

    // Output column editor template 
    @Output() columnEditorEmiter: EventEmitter<any> = new EventEmitter<any>();

    loading$ :Observable<boolean> = of(true);
    total$!: Observable<number>;
    data$: Observable<readonly any[]> = of([]);
    request$!: Observable<readonly (any | null)[] | null>;
    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);

    readonly direction$ = new BehaviorSubject<-1 | 1>(1);
    readonly sorter$ = new BehaviorSubject<any>('');

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) { } 

    ngOnInit(): void {
        this.sorter$.next(this.sortByColumnKey)
        this.columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);           
        this.columnKeys = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.dataKey);
        this.KEYS = Object.fromEntries( this.tableColumns.map((tableColumn: TableColumn) =>  ([tableColumn.name , tableColumn.dataKey]) ) );
        this.enabled = this.columnNames;

        if (this.rowActionIcon || this.rowActionText) {
            this.columnKeys = ['actions', ...this.columnKeys]
        }

        // Subscribing on data from input to track them
        this.DATA.subscribe(data => {
            if(data !== null){
                this.updateData(data);
            }
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // Method for inject column editor button in parent template 
    /* Insert this in parent template:
    html:
        <div *ngTemplateOutlet="columnEditorTemplate"></div>
    ts:
        columnEditorTemplate:any;
        setColumnEditorTemplate(templateRef: TemplateRef<any>) {
            this.columnEditorTemplate = templateRef;
            this._changeDetectorRef.markForCheck();
        }
    */
    // @ViewChild(TemplateRef)
    // columnEditor!: TemplateRef<any>;
    // ngAfterViewInit() {
    //     this.columnEditorEmiter.emit(this.columnEditor)
    // }

    /** 
    * Refreshing data in table
    * @param key string | number
    */
    updateData(data : any){
        this.request$ = combineLatest([
            this.sorter$,
            this.direction$,
            this.page$,
            this.size$
        ]).pipe(
            debounceTime(0),
            switchMap(query => this.getData(...query, data).pipe(startWith(null))),
            share(),
        );

        this.loading$ = this.request$.pipe(map(value => !value));
    
        this.total$ = this.request$.pipe(
            filter(tuiIsPresent),
            map(({length}) => length),
            startWith(1),
        );

        this.data$ = this.request$.pipe(
            filter(tuiIsPresent),
            map(riurs => riurs.filter(tuiIsPresent)),
            startWith([])
        );
        this._changeDetectorRef.markForCheck();
    }

    emitRowAction(row: any) {
        this.rowAction.emit(row);
    }

    /**
     * Method for set enabled column in table
     * @param enabled 
     */
    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columnKeys = this.columnNames
            .filter(column => enabled.includes(column))
            .map(column => this.KEYS[column] );

        this._changeDetectorRef.markForCheck();
    }
  
    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }
  
    onSize(size: number): void {
        this.size$.next(size);
    }
  
    onPage(page: number): void {
        this.page$.next(page);
    }
  
    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }
  
    getTableCellByKey(item: any, key:string | number):string {
      return item[key]
    }
  
    private getData(
        key:string | number,
        direction: -1 | 1,
        page: number,
        size: number,
        data: any
    ): Observable<ReadonlyArray<any | null>> {
        this.loading$.pipe(map(value => !value))
        const start = page * size;
        const end = start + size;
        const result = data
            .sort(sortBy(key, direction)) 
            .map((data: any, index: number) => (index >= start && index < end ? data : null))
        
        this.loading$.pipe(map(value => !value))
        return of(result);
    }
}
/**
* Sorting by key getting in Input 
*
* @param key string | number
* @param direction -1 | 1
*/
function sortBy(key: string | number, direction: -1 | 1): TuiComparator<any> {
    return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
}
 