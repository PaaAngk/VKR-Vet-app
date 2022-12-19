import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryComponent } from './registry.component';
import { RegistryRoutingModule } from './registry.routing'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Taiga
import { TuiLinkModule, TuiSvgModule, TuiTextfieldControllerModule, TuiHostedDropdownModule, TuiPrimitiveTextfieldModule, TuiLoaderModule, TuiButtonModule, TuiErrorModule, TuiDataListModule, TuiGroupModule } from '@taiga-ui/core';
import {TuiActiveZoneModule, TuiFilterPipeModule, TuiLetModule} from '@taiga-ui/cdk';
import { TuiStepperModule, TuiComboBoxModule, TuiDataListWrapperModule, TuiInputNumberModule, TuiTreeModule, TuiArrowModule, TuiCheckboxLabeledModule, TuiInputCountModule, TuiInputModule, TuiTabsModule, TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputFilesModule, TuiFilesModule, TuiInputDateRangeModule, TuiFilterByInputPipeModule } from '@taiga-ui/kit';
import {TuiSidebarModule} from '@taiga-ui/addon-mobile';

// Components
import { RegistryReportComponent } from './registry-report/registry-report.component';
import { RegistryDownloadComponent } from './registry-download/registry-download.component';
import { RegistryDownloadFormComponent } from './registry-download/registry-download-form/registry-download-form.component';
import { RegistryObjectCardComponent } from './registry-object-card/registry-object-card.component';
import { RegistrySearchComponent } from './registry-search/registry-search.component'
import { RegistryRequestComponent } from './registry-request/registry-request.component';

import { AdvancedTableModule } from '@shared/components/advanced-table/advanced-table.module';
import { AdvancedDynamicFilterModule } from '@shared/components/advanced-dynamic-filter/advanced-dynamic-filter.module';
import { RegistryService } from './registry.service';
import { RegistrySearchResolver } from 'src/app/modules/registry/registry.resolvers';


@NgModule({
  imports: [
    CommonModule,
    RegistryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AdvancedDynamicFilterModule,
    AdvancedTableModule,

    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLetModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiSvgModule,
    TuiLoaderModule,
    TuiPrimitiveTextfieldModule,
    TuiHostedDropdownModule,
    TuiTextfieldControllerModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiTreeModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
    TuiTabsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiInputFilesModule, 
    TuiFilesModule,
    TuiInputDateRangeModule,
    
    TuiFilterByInputPipeModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFilterPipeModule,
    TuiInputNumberModule,
    TuiStepperModule,
  ],
  declarations: [
    RegistryComponent, 
    RegistryReportComponent, 
    RegistrySearchComponent, 
    RegistryObjectCardComponent, 
    RegistryDownloadComponent,
    RegistryDownloadFormComponent,
    RegistryRequestComponent,
  ],
  providers:[
    RegistryService,
    RegistrySearchResolver,
  ]
})
export class RegistryModule { }
