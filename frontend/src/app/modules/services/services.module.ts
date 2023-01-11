import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services.component';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AddServiceComponent } from './add-service/add-service.component';


@NgModule({
  declarations: [
    ServicesComponent,
    AddServiceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,

    //TUI
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiButtonModule,
    TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiInputNumberModule,
  ]
})
export class ServiceModule { }
