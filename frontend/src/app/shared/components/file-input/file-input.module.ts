import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputFilesModule } from '@taiga-ui/kit';
import { FileInputComponent } from './file-input.component';
import { TuiErrorModule } from '@taiga-ui/core';


@NgModule({
  declarations: [
    FileInputComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TuiInputFilesModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  exports:[
    FileInputComponent,
  ]
})
export class FileInputModule {}
