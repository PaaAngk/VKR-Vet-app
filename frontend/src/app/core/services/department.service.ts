import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';
import { Department } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public currentDepartmentSubject = new BehaviorSubject<Department | undefined>(undefined);
  public currentDepartment = this.currentDepartmentSubject.asObservable().pipe(distinctUntilChanged());
  
  constructor(){
    const cookieValue = window.localStorage['department'];
    if (this.isDepartment(cookieValue)){
      this.currentDepartmentSubject.next(cookieValue);
    }
    else{
      this.currentDepartmentSubject.next(undefined)
    }
  }

  getCurrentDepartment(): Department | undefined {
    return this.currentDepartmentSubject.getValue();
  }

  getCurrentDepartmentKey(): any {
    if (!this.currentDepartmentSubject.getValue()) return undefined
    return Object.keys(Department)[Object.values(Department)
      .indexOf(this.currentDepartmentSubject.getValue() as Department)];
  }

  setCurrentDepartment(department: Department) {
    this.currentDepartmentSubject.next(department);
    window.localStorage['department'] = department;
    window.location.reload();
  }

  isDepartment (value: string): value is Department {
    return Object.values(Department).includes(value as Department);
  }
  
}
