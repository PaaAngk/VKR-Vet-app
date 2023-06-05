import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedDynamicFilterComponent } from './advanced-dynamic-filter.component';
import { DynamicFilterItemComponent } from './dynamic-filter-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputNumberModule, TuiInputModule, TuiInputDateRangeModule, TuiInputDateModule, TuiFieldErrorPipeModule, TuiComboBoxModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule, TuiSelectModule, TuiTabsModule, TuiAccordionModule, TuiCheckboxBlockModule, TuiInputRangeModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule, TuiErrorModule, TuiPrimitiveTextfieldModule, TuiScrollbarModule, TuiTextfieldControllerModule, TuiSvgModule, TuiGroupModule } from '@taiga-ui/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //TUI
    TuiInputModule,
    TuiInputNumberModule,
    TuiPrimitiveTextfieldModule,
    TuiInputDateRangeModule,
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiDropdownModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiSelectModule,
    TuiButtonModule,
    TuiTabsModule,
    TuiScrollbarModule,
    TuiAccordionModule,
    TuiActiveZoneModule,
    TuiSvgModule,
    TuiCheckboxBlockModule,
    TuiGroupModule,
    TuiInputRangeModule,
    TuiMultiSelectModule,
  ],
  declarations: [
    AdvancedDynamicFilterComponent, 
    DynamicFilterItemComponent,
  ],
  exports: [
    AdvancedDynamicFilterComponent
  ]
})
export class AdvancedDynamicFilterModule { }
