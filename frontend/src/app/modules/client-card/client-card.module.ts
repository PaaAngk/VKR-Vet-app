import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientCardRoutingModule } from './client-card-routing.module';
import { ClientComponent } from './client/client.component';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputCountModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiInputPhoneModule, TuiInputSliderModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTabsModule, TuiTagModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiFormatPhonePipeModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiPrimitiveTextfieldModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule, TuiLetModule } from '@taiga-ui/cdk';

import { DialogClientComponent } from './dialog/client-dialog/client-dialog.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { PetDialogComponent } from './dialog/add-pet/pet-dialog.component';
import { FormatPetGenderPipe } from 'src/app/shared/pipes/format-pet-gender.pipe';
import { CheckNullPipe } from 'src/app/shared/pipes/check-null.pipe';
import { PetComponent } from './pet/pet.component';
import { ReceptionComponent } from './reception/new-and-edit/reception.component';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import { CheckboxListComponent } from './reception/checkbox-list/checkbox-list.component';
import { AdvancedTableModule } from 'src/app/shared/components/advanced-table';
import { ButtonWithDropdownModule } from 'src/app/shared/components/button-with-dropdown/button-dropdown.module';
import { ReceptionViewComponent } from './reception/view/reception-view.component';
import { ArrayToAnyArrayPipe } from 'src/app/shared/pipes/array-to-any-array.pipe';
import { SafeHtmlPipe } from 'src/app/shared/pipes/safe-html.pipe';
import { TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { DocumentGenerateService } from './document-generate.service';
import { HttpClientModule } from '@angular/common/http';
import { AdvancedDynamicFilterModule } from 'src/app/shared/components/advanced-dynamic-filter';
import { AnalyzesComponent } from './analyzes/analyzes-add/analyzes.component';
import { AnalyzesViewComponent } from './analyzes/view/analyzes-view.component';

@NgModule({
  declarations: [
    ClientComponent, 
    DialogClientComponent,
    ClientDetailComponent,
    PetDialogComponent,
    FormatPetGenderPipe,
    CheckNullPipe,
    PetComponent,
    ReceptionComponent,
    CheckboxListComponent,
    ReceptionViewComponent,
    ArrayToAnyArrayPipe,
    SafeHtmlPipe,
    AnalyzesComponent,
    AnalyzesViewComponent
  ],
  imports: [
    CommonModule,
    ClientCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdvancedTableModule,
    HttpClientModule,
    ButtonWithDropdownModule,
    AdvancedDynamicFilterModule,

    TuiInputModule,
    TuiButtonModule,
    TuiPrimitiveTextfieldModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiTableModule,
    TuiLetModule,
    TuiTagModule,
    TuiLinkModule,
    TuiDialogModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
    TuiErrorModule,
    TuiAlertModule,
    TuiTabsModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiTextAreaModule,
    TuiMultiSelectModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiDataListModule,
    TuiComboBoxModule, 
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiHintModule,
    TuiFormatPhonePipeModule,
    TuiEditorModule,
    TuiInputCountModule,
    TuiInputSliderModule,
    TuiSelectModule,
    TuiFilterPipeModule,
    TuiLoaderModule,
    TuiHostedDropdownModule,
    TuiStringifyContentPipeModule,
  ],
  providers:[
    DatePipe,
    DocumentGenerateService,
    CheckNullPipe,
  ]
})
export class ClientCardModule {}
