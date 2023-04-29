import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'edit-delete-button',
  templateUrl: './edit-delete-button.component.html',
})
export class EditDeleteButtonComponent {
  @Output() editAction: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  
  openDropdown = false;

  editClick(){
    this.editAction.emit();
  }

  deleteClick(){
    this.deleteAction.emit();
  }
}
