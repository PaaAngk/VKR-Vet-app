import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkScheduleRoutingModule } from './work-schedule-routing.module';
import { WorkScheduleComponent } from './work-schedule.component';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    WorkScheduleComponent
  ],
  imports: [
    CommonModule,
    WorkScheduleRoutingModule, 

    TuiLoaderModule,
    TuiButtonModule,
    FullCalendarModule,
  ]
})
export class WorkScheduleModule { }
