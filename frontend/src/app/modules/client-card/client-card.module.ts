import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientCardRoutingModule } from './client-card-routing.module';
import { ClientComponent } from './client/client.component';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputCountModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiInputPhoneModule, TuiMultiSelectModule, TuiRadioBlockModule, TuiSelectModule, TuiTabsModule, TuiTagModule, TuiTextAreaModule } from '@taiga-ui/kit';
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

import { AddClientComponent } from './dialog/add-client/add-client.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { AddPetComponent } from './dialog/add-pet/add-pet.component';
import { FormatPetGenderPipe } from 'src/app/shared/pipes/format-pet-gender.pipe';
import { CheckNullPipe } from 'src/app/shared/pipes/check-null.pipe';
import { PetComponent } from './pet/pet.component';
import { ReceptionComponent } from './reception/new/reception.component';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import { CheckboxListComponent } from './reception/checkbox-list/checkbox-list.component';
import { AdvancedTableModule } from 'src/app/shared/components/advanced-table';
import { ButtonWithDropdownModule } from 'src/app/shared/components/button-with-dropdown/button-dropdown.module';
import { ReceptionViewComponent } from './reception/view/reception-view.component';
import { ArrayToAnyArrayPipe } from 'src/app/shared/pipes/array-to-any-array.pipe';

@NgModule({
  declarations: [
    ClientComponent, 
    AddClientComponent,
    ClientDetailComponent,
    AddPetComponent,
    FormatPetGenderPipe,
    CheckNullPipe,
    PetComponent,
    ReceptionComponent,
    CheckboxListComponent,
    ReceptionViewComponent,
    ArrayToAnyArrayPipe,
  ],
  imports: [
    CommonModule,
    ClientCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdvancedTableModule,
    ButtonWithDropdownModule,

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
    TuiSelectModule,
    TuiFilterPipeModule,
    TuiLoaderModule,
    TuiHostedDropdownModule,
  ],
})
export class ClientCardModule {}