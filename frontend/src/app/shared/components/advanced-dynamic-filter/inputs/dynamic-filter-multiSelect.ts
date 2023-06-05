import { DynamicFilterInput } from '../dynamic-filter-base.class';

export class MultiSelectDynamicFilter extends DynamicFilterInput<string[]> {
  override controlType = 'multiSelect';
}