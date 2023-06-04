import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiFileLike } from '@taiga-ui/kit';


@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements OnInit {
	constructor(
		private _changeDetectorRef: ChangeDetectorRef,
	){}
  	@Output() outputFile: EventEmitter<any> = new EventEmitter<any>();

    @Input() editFiles: never[] = [];

	editMode = false;
  	readonly control = new FormControl([], [maxFilesLength(5)]);
    rejectedFiles: readonly TuiFileLike[] = [];
 
    ngOnInit(): void {
		// if (this.editFiles.length > 0){
		// 	this.editMode = true;
		// 	this.control.setValue(this.editFiles);
		// }
      	this.control.statusChanges.subscribe(() => {
			if(!this.control.errors){
				this.outputFileEmit(this.control.value)
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
		? { maxLength: new TuiValidationError( 'Ошибка: Максимальное количество - 5 файлов', ), } : null;
  };
}