import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from 'graphql/jsutils/Maybe';
  
@Pipe({
    name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {
    transform(value: Maybe<string>  | undefined | number): string {
        if (value == null){
            return "Нет данных"
        }
        else {
            return String(value)
        }
    }
}