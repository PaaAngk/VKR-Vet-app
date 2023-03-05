import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiFilterByInputPipeModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule, TuiStringifyContentPipeModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoodsComponent } from './goods.component';
import { TuiButtonModule, TuiDataListModule, TuiErrorModule, TuiGroupModule, TuiHintModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule, TuiValidatorModule } from '@taiga-ui/cdk';
import { AddGoodsComponent } from './add-good/add-good.component';
import { GoodsService } from './goods.service';


@NgModule({
  declarations: [
    GoodsComponent,
    AddGoodsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoodsRoutingModule,

    //TUI
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiButtonModule,
    TuiLetModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiInputNumberModule,
    TuiDataListWrapperModule,
    TuiComboBoxModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule,
    TuiGroupModule,
    TuiValidatorModule,
    TuiHintModule,
  ],
  providers: [GoodsService]
})
export class GoodsModule { }
