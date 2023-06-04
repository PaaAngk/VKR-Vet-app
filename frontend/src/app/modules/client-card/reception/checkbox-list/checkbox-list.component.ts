import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {EMPTY_ARRAY, TUI_DEFAULT_MATCHER} from '@taiga-ui/cdk';
import {TuiDataListComponent, tuiIsEditingKey} from '@taiga-ui/core';
import { Goods } from 'src/graphql/generated';

interface IncludeItems{
    readonly id: number;
    readonly name: string;
    readonly price: number;
}

interface Items<T> {
    readonly id: number;
    readonly typeName: string;
    readonly items: T[];//IncludeItems[];
}

@Component({
    selector: `checkbox-list`,
    templateUrl: `./checkbox-list.template.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent<T extends Goods> {
    @Input()
    items: ReadonlyArray<Items<T>> = [];

    value = ``;

    readonly all = EMPTY_ARRAY;

    readonly filter = TUI_DEFAULT_MATCHER;

    readonly matcher = (items: T, search: string): boolean => items.name.toLowerCase().includes(search.toLowerCase().trim());

    readonly stringify = ( items: T ): string => items.name;


    onArrowDown<T>(list: TuiDataListComponent<T>, event: Event): void {
        list.onFocus(event, true);
    }

    onKeyDown(key: string, element: HTMLElement | null): void {
        if (element && tuiIsEditingKey(key)) {
            element.focus({preventScroll: true});
        }
    }
}
