import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { FileViewComponent } from './file-view.component';


@NgModule({
  declarations: [
    FileViewComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TuiButtonModule,
    TuiGroupModule,
  ],
  exports:[
    FileViewComponent,
  ]
})
export class FileViewModule {}
