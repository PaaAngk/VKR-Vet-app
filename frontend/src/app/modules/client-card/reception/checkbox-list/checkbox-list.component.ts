import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EMPTY_ARRAY, TUI_DEFAULT_MATCHER} from '@taiga-ui/cdk';
import {TuiDataListComponent, tuiIsEditingKey} from '@taiga-ui/core';
import { concatMap, delay, from, iif, Observable, of, Subject, switchMap } from 'rxjs';
import { Goods } from 'src/graphql/generated';

// interface IncludeItems{
//     readonly id: number;
//     readonly name: string;
//     readonly price: number;
// }

// interface Items<T> {
//     readonly id: number;
//     readonly typeName: string;
//     readonly items: T[];//IncludeItems[];
// }

const CHUNK_SIZE = 1;
  
@Component({
    selector: `checkbox-list`,
    templateUrl: `./checkbox-list.template.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent<T extends Goods> implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @Input()
    items: Array<T> = [];//Items<T>

    @Input()
    items1: any;

    value = ``;

    readonly all = EMPTY_ARRAY;

    readonly filter = TUI_DEFAULT_MATCHER;

    readonly matcher = (items: T, search: string): boolean => items.name.toLowerCase().includes(search.toLowerCase().trim());

    readonly stringify = ( items: T ): string => items.name;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ){}

    ngOnInit() {
        // this.items1?.pipe(
        //     switchMap(data => {
        //         this.items = [];
        //         return from(slicer(data)).pipe(
        //             concatMap(chunk => of(chunk).pipe(delay(0)))
        //         );
        //     })
        // ).subscribe(array => {
        //     this.items = this.items.concat(array);
        //     // console.log(this.items)
        //     // console.log(array)
        //     // this._changeDetectorRef.markForCheck()
        // })
        console.log(1)
    }

    ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}


    onArrowDown<T>(list: TuiDataListComponent<T>, event: Event): void {
        list.onFocus(event, true);
    }

    onKeyDown(key: string, element: HTMLElement | null): void {
        if (element && tuiIsEditingKey(key)) {
            element.focus({preventScroll: true});
        }
    }

    trackByFn(index: any, item: any) {
        return item.id;
    }
}
function* slicer(payload: any) {
    for (let i = 0; i < payload.length; i += CHUNK_SIZE) {
      yield payload.slice(i, i + CHUNK_SIZE);
    }
    return;
}

