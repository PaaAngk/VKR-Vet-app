import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiInputTimeModule, TuiSelectModule, TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiGroupModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { SchedulerService } from './scheduler.service';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddReceptionRecordDialogComponent } from './dialogs/add-reception/add-reception.component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { NativeDateTransformerDirective } from 'src/app/shared/directives/native-date-transformer.directive';


@NgModule({
  declarations: [
    SchedulerComponent,
    AddReceptionRecordDialogComponent,
    NativeDateTransformerDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SchedulerRoutingModule,
    FullCalendarModule,

    //TUI
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiComboBoxModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiGroupModule,
  ],
  providers: [SchedulerService]
})
export class SchedulerModule { }
