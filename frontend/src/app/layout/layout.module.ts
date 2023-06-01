// import { SearchModule } from './../shared/components/layout/search/search.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import {TuiTabsModule, TuiArrowModule} from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // SearchModule,
    
    //TUI
    TuiTabsModule,
    TuiArrowModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
  declarations: [
    LayoutComponent,
  ]
  
})
export class LayoutModule { }
