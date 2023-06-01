import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { ShowAuthedDirective } from './directives';

@NgModule({
  imports: [
    CommonModule, 
    TuiButtonModule, 
  ],
  declarations: [
    ShowAuthedDirective,  
  ],
  exports: [ShowAuthedDirective],
})
export class SharedModule {}
