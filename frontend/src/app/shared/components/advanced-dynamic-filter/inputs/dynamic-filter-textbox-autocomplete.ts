import { DynamicFilterInput } from './../dynamic-filter-base.class';

export class TextboxAutocompleteDynamicFilter extends DynamicFilterInput<string> {
  override controlType = 'textboxAutocomplete';
}
