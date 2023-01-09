export interface ButtonWithDropdown {
  readonly buttonName : string;
  readonly dropdownItems: ButtonWithDropdownItem[];
}

export interface ButtonWithDropdownItem{
  readonly name : string;
  readonly event : string;
}