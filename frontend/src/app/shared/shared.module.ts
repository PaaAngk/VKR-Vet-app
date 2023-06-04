import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { ShowAuthedDirective } from './directives';
import { NativeDateTransformerDirective } from './directives/native-date-transformer.directive';

@NgModule({
  imports: [
    CommonModule, 
    TuiButtonModule, 
  ],
  declarations: [
    ShowAuthedDirective,
    NativeDateTransformerDirective,  
  ],
  exports: [
    ShowAuthedDirective,
    NativeDateTransformerDirective,
  ],
})
export class SharedModule {}
