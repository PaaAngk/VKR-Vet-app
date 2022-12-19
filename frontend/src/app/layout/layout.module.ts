// import { SearchModule } from './../shared/components/layout/search/search.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from '../shared/directives';

import {TuiTabsModule, TuiArrowModule} from '@taiga-ui/kit';
import {TuiHostedDropdownModule, TuiDataListModule, TuiDropdownModule, TuiSvgModule} from '@taiga-ui/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // SearchModule,
    
    //TUI
    TuiTabsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiArrowModule,
    TuiDropdownModule,
    TuiSvgModule,
    
  ],
  declarations: [
    LayoutComponent,
    ShowAuthedDirective,
  ]
  
})
export class LayoutModule { }
