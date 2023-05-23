import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiFieldErrorPipeModule, TuiInputDateRangeModule, TuiInputModule, TuiSelectModule, TuiStringifyContentPipeModule, TuiTabsModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiLetModule, TuiMapperPipeModule } from '@taiga-ui/cdk';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { TuiAxesModule, TuiLineChartModule, TuiLineDaysChartModule } from '@taiga-ui/addon-charts';
import { XlabelsOnChartPipe } from './labels.pipe';

@NgModule({
  declarations: [
    AnalyticsComponent,
    XlabelsOnChartPipe,
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
    TuiLineChartModule,
    TuiMapperPipeModule,

  ],
  providers:[]
})
export class AnalyticsModule { }
