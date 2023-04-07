import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class TextboxDynamicFilter extends DynamicFilterInput<string> {
  override controlType = 'textbox';
}
