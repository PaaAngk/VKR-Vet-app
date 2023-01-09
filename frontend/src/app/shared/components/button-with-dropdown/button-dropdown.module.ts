import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDropdownComponent } from './button-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiGroupModule, TuiHostedDropdownModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [
    ButtonDropdownComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TuiSvgModule,
    TuiDataListModule,
    TuiButtonModule,
    TuiHostedDropdownModule,
    TuiDataListWrapperModule,
    TuiGroupModule,
  ],
  exports:[
    ButtonDropdownComponent,
  ]
})
export class ButtonWithDropdownModule {}
