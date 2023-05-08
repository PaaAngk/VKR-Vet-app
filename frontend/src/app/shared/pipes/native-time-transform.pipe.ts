import { Pipe, PipeTransform } from '@angular/core';
import { TuiTime } from '@taiga-ui/cdk';

type From = TuiTime | null;

type To = Date | null;

@Pipe({ name: 'nativeToTuiTime' })
export class NativeToTuiTimeTransformerPipe implements PipeTransform{
    transform(controlValue: To): From {
        return controlValue && TuiTime.fromLocalNativeDate(controlValue);
    }
}
