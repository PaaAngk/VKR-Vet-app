import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class InputRangeDynamicFilter extends DynamicFilterInput<string[]> {
  override controlType = 'inputRange';
}
