import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class DateRangeDynamicFilter extends DynamicFilterInput<number> {
  override controlType = 'dateRange';
}
