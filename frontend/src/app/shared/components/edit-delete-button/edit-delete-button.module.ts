import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiButtonModule, TuiGroupModule, TuiSvgModule } from '@taiga-ui/core';
import { EditDeleteButtonComponent } from './edit-delete-button.component';


@NgModule({
  declarations: [
    EditDeleteButtonComponent, 
  ],
  imports: [
    CommonModule,

    TuiSvgModule,
    TuiButtonModule,
    TuiGroupModule,
  ],
  exports:[
    EditDeleteButtonComponent,
  ]
})
export class EditDeleteButtonModule {}
