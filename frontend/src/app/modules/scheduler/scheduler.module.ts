import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { SchedulerService } from './scheduler.service';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    SchedulerComponent,
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
  ],
  providers: [SchedulerService]
})
export class SchedulerModule { }
