import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiGroupModule, TuiLoaderModule } from '@taiga-ui/core';
import { FileViewComponent } from './file-view.component';
import { TuiProgressModule } from '@taiga-ui/kit';


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
    TuiLoaderModule,
    TuiProgressModule,
  ],
  exports:[
    FileViewComponent,
  ]
})
export class FileViewModule {}
