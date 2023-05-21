import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiFieldErrorPipeModule, TuiInputDateRangeModule, TuiInputModule, TuiSelectModule, TuiStringifyContentPipeModule, TuiTabsModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { TuiAxesModule, TuiLineDaysChartModule } from '@taiga-ui/addon-charts';


@NgModule({
  declarations: [
    AnalyticsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnalyticsRoutingModule,

    //TUI
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiStringifyContentPipeModule,
    TuiTabsModule,
    TuiLineDaysChartModule,
    TuiAxesModule,
    TuiInputDateRangeModule,
  ]
})
export class AnalyticsModule { }
