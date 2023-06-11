// import { UserService } from '@core/services';
import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/graphql/generated';
import { UserService } from '../core';
import { AuthService } from '../core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  activeMenuItemIndex : number = 0;

  currentUser!: User;//User
  today: number = Date.now();

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
  ) { 
  }

  ngOnInit() {
    this.getUser();
    setInterval(() => {
      this.today = Date.now();
      this.cd.markForCheck();
    }, 1000);

  }

  getUser(){
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.authService.purgeAuth();
    location.reload();
  }

  getAdminPanel(){
    location.replace(`${environment.api_url}/admin`)
  }
}
