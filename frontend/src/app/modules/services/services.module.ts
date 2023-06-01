import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule, TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services.component';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AddServiceComponent } from './add-service/add-service.component';
import { DeleteConfirmComponent } from 'src/app/shared/components/dialog/delete-confirm/delete-confirm.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    ServicesComponent,
    AddServiceComponent,
    DeleteConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    SharedModule,

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
    TuiDataListWrapperModule,
    TuiComboBoxModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule,
  ]
})
export class ServiceModule { }
