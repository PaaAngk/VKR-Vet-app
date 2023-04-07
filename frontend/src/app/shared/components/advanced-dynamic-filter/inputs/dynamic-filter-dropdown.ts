import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class DropdownDynamicFilter extends DynamicFilterInput<string[]> {
  override controlType = 'dropdown';
}
