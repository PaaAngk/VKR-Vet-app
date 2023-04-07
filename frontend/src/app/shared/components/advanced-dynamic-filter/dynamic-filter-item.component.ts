import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

import { DynamicFilterInput } from './dynamic-filter-base.class';

@Component({
  selector: 'dynamic-filter-item',
  templateUrl: './dynamic-filter-item.component.html'
})
export class DynamicFilterItemComponent {
  @Input() input!: DynamicFilterInput<string>;

  @Input() form!: FormGroup;

  get isValid() { return this.form.controls[this.input.key].valid; }
}
