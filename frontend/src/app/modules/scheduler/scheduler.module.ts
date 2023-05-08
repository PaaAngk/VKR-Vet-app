import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiInputTimeModule, TuiSelectModule, TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiGroupModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { SchedulerService } from './scheduler.service';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddReceptionRecordDialogComponent } from './dialogs/add-record/add-reception.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { NativeDateTransformerDirective } from 'src/app/shared/directives/native-date-transformer.directive';
import { ViewReceptionRecordDialogComponent } from './dialogs/view-record/view-record.component';
import { NativeToTuiTimeTransformerPipe } from 'src/app/shared/pipes/native-time-transform.pipe';
import { EditDeleteButtonModule } from 'src/app/shared/components/edit-delete-button/edit-delete-button.module';


@NgModule({
  declarations: [
    SchedulerComponent,
    AddReceptionRecordDialogComponent,
    NativeDateTransformerDirective,
    ViewReceptionRecordDialogComponent,
    NativeToTuiTimeTransformerPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SchedulerRoutingModule,
    FullCalendarModule,
    EditDeleteButtonModule,

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
  providers: [
    SchedulerService,
  ]
})
export class SchedulerModule { }
