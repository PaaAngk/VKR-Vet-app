import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiFileLike } from '@taiga-ui/kit';


@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
})
export class FileInputComponent implements OnInit {
  	@Output() outputFile: EventEmitter<any> = new EventEmitter<any>();
  
  	readonly control = new FormControl([], [maxFilesLength(3)]);
    rejectedFiles: readonly TuiFileLike[] = [];
 
    ngOnInit(): void {
        this.control.statusChanges.subscribe(() => {
			if(!this.control.errors){
				this.outputFileEmit(this.control.value)
				console.log(this.control.value)
			} else {
				this.outputFileEmit({})
			}
        });
    }
 
    onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
    }
 
    removeFile({name}: File): void {
        this.control.setValue(
            this.control.value?.filter((current: File) => current.name !== name) ?? [],
        );
    }
 
    clearRejected({name}: TuiFileLike): void {
        this.rejectedFiles = this.rejectedFiles.filter(
            rejected => rejected.name !== name,
        );
    }

  outputFileEmit(control: any){
    this.outputFile.emit(control);
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({value}: AbstractControl) => {
      return value.length > maxLength
          ? {
                maxLength: new TuiValidationError(
                    'Ошибка: Максимальное количество - 3 файла',
                ),
            }
          : null;
  };
}