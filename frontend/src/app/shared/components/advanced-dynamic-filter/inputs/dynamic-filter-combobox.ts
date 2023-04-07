import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class ComboboxDynamicFilter extends DynamicFilterInput<string[]> {
  override controlType = 'combobox';
}
