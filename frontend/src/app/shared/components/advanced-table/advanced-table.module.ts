import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TuiHostedDropdownModule, TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiTableModule, TuiReorderModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

import { AdvancedTableComponent } from './advanced-table.component';
import { TuiInputNumberModule, TuiTextAreaModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,

		TuiButtonModule,
		TuiTablePaginationModule,
		TuiLoaderModule,
		TuiReorderModule,
		TuiHostedDropdownModule,
		TuiTableModule,

		
		TuiTextAreaModule,
		TuiInputNumberModule,
	],
	declarations: [
		AdvancedTableComponent
	],
	exports: [
		AdvancedTableComponent
	]
})
export class AdvancedTableModule { }
