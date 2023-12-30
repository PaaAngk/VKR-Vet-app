// import { UserService } from '@core/services';
import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/graphql/generated';
import { Department, DepartmentService, UserService } from '../core';
import { AuthService } from '../core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  activeMenuItemIndex : number = 0;

  depCityForm = new FormGroup({
    city: new FormControl(''),
  });

  departmentsList = Object.values(Department)

  openChoiceDepartment = false;

  currentUser!: User;//User
  currentDepartment?: string;
  today: number = Date.now();

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private departmentService: DepartmentService,
  ) { 
    console.log(this.departmentService.getCurrentDepartment())
    if(!this.departmentService.getCurrentDepartment()) this.openChoiceDepartment = true;
    this.departmentService.currentDepartment.subscribe({
      next: (v) => {
        this.currentDepartment = v;
        this.depCityForm.setValue({
          city: v as string
        })
      }
    })
  }

  ngOnInit() {
    this.getUser();
    setInterval(() => {
      this.today = Date.now();
      this.cd.markForCheck();
    }, 1000);

  }

  showDialogChoiceDepartment(): void {
      this.openChoiceDepartment = true;
  }

  getUser(){
    this.currentUser = this.userService.getCurrentUser();
  }

  submitDepartment(observer: any){
    observer.complete()
    if (this.currentDepartment != this.depCityForm.value.city) 
      this.departmentService.setCurrentDepartment(this.depCityForm.value.city as Department);
    this.openChoiceDepartment = false;
  }

  logout() {
    this.authService.purgeAuth();
    location.reload();
  }

  getAdminPanel(){
    location.replace(`${environment.api_url}/admin`)
  }
}
