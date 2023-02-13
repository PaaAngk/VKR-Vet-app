import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from 'graphql/jsutils/Maybe';
  
@Pipe({
    name: 'formatPetGender'
})
export class FormatPetGenderPipe implements PipeTransform {
    transform(value: Maybe<boolean>  | undefined): string {
        if (value){
            return "Мужской"
        }
        if (value == null){
            return "Нет данных"
        }
        else {
            return "Женский"
        }
    }
}