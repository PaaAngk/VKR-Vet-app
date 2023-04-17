import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from 'graphql/jsutils/Maybe';
import calculateAge from 'calculate-age'
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'ageString'
})
export class AgeStringPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}

    transform(dob: string): string {
        const age = calculateAge(this.datePipe.transform(dob,  'yyyy-MM-dd') as string).getObject()
        let yearString = '';
        let monthsString = '';
        if (age.years> 9 && age.years <21){
            yearString='лет'
          }
        else{
            switch (age.years % 10) {
                case 0:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    yearString='лет'
                    break;
                case 2:
                case 3:
                case 4:
                    yearString='года'
                    break;
                case 1:
                    yearString='год'
                    break;
            }
        }
        switch (age.months) {
            case 0:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                monthsString='месяцев'
                break;
            case 1:
                monthsString='месяц'
                break;
            case 2:
            case 3:
            case 4:
                monthsString='месяца'
                break;
        }
          
        return `${age.years} ${yearString} ${age.months} ${monthsString}`
    }
}