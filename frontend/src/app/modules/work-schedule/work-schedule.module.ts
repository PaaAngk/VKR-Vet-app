import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkScheduleRoutingModule } from './work-schedule-routing.module';
import { WorkScheduleComponent } from './work-schedule.component';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { WorkScheduleService } from './work-schedule.service';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiComboBoxModule, TuiFilterByInputPipeModule, TuiStringifyContentPipeModule, TuiInputTimeModule, TuiInputDateModule, TuiDataListWrapperModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { AddWorkScheduleDialogComponent } from './dialogs/add-record/add-workSchedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeDateTransformerDirective } from 'src/app/shared/directives/native-date-transformer.directive';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    WorkScheduleComponent,
    AddWorkScheduleDialogComponent,
    NativeDateTransformerDirective,
  ],
  imports: [
    CommonModule,
    WorkScheduleRoutingModule, 
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiComboBoxModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule,
    TuiInputTimeModule,
    TuiInputDateModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputNumberModule,
    TuiHintModule,
  ],
  providers:[
    WorkScheduleService
  ]
})
export class WorkScheduleModule { }
