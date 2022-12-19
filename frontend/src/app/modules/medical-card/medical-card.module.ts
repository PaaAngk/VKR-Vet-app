import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalCardRoutingModule } from './medical-card-routing.module';
import { ClientComponent } from './client/client.component';
import { TuiInputModule, TuiTagModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogModule, TuiLinkModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    MedicalCardRoutingModule,

    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiPrimitiveTextfieldModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiTableModule,
    TuiLetModule,
    TuiTagModule,
    TuiLinkModule,
    TuiDialogModule,
  ]
})
export class MedicalCardModule { }
