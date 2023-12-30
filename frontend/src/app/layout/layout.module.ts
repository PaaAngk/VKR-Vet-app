// import { SearchModule } from './../shared/components/layout/search/search.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import {TuiTabsModule, TuiArrowModule, TuiSelectModule, TuiDataListWrapperModule} from '@taiga-ui/kit';
import { TuiButtonModule, TuiDialogModule, TuiSvgModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // SearchModule,
    
    //TUI
    TuiTabsModule,
    TuiArrowModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDialogModule,
    TuiDataListWrapperModule,
  ],
  declarations: [
    LayoutComponent,
  ]
  
})
export class LayoutModule { }
