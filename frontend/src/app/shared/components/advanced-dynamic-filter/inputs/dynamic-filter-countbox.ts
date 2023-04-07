import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class CountboxDynamicFilter extends DynamicFilterInput<number> {
  override controlType = 'countbox';
}
