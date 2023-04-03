import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonWithDropdown, ButtonWithDropdownItem } from './buttonWithDropdown.interface';


@Component({
  selector: 'button-with-dropdown',
  templateUrl: './button-dropdown.component.html',
})
export class ButtonDropdownComponent {

  @Input() data: ButtonWithDropdown = {} as ButtonWithDropdown;

  @Input() showLoader: boolean = false;

  @Output() buttonAction: EventEmitter<any> = new EventEmitter<any>();

  @Output() dropdownAction: EventEmitter<any> = new EventEmitter<any>();
  
  openDropdown = false;

  buttonClick(){
      this.buttonAction.emit();
  }

  dropdownItemClick(item : ButtonWithDropdownItem){
    this.dropdownAction.emit(item);
  }
}
