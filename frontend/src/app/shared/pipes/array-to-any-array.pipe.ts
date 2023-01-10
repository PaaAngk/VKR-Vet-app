import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from 'graphql/jsutils/Maybe';
  
@Pipe({
    name: 'arrayToAnyArray'
})
export class ArrayToAnyArrayPipe implements PipeTransform {
    transform(value: Maybe<any[]> | any[]): any[] {
        return {...value} as any[]
    }
}