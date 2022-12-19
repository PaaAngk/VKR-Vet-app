// import { UserService } from '@core/services';
import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '@core/services/user/user.types';
// import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  
  activeMenuItemIndex : number = 0;

  currentUrl = ''
  currentMainMenuItem?: string;

  currentUser!: any;//User
  today: number = Date.now();

  readonly dropdown : String[]
  
  open = false;
 
  index = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private userService: UserService,
    private cd: ChangeDetectorRef,
    // private authService: AuthService,
  ) { 
    this.dropdown = ['Carol Cleveland', 'Neil Innes'];
  }

  ngOnInit() {
    // this.getUser();
    this.currentUrl = this.router['routerState'].snapshot.url; 
    this.currentMainMenuItem = this.currentUrl.split('/')[1]
  }

  // getUser(){
  //   this.userService.currentUser.subscribe(
  //     (userData) => {
  //       this.currentUser = userData;
  //       this.cd.markForCheck();
  //     }
  //   );
  // }

  

  onClick() {
      this.open = false;
      this.index = 1;
  }

  stop(event: Event) {
      // We need to stop tab custom event so parent component does not think its active
      event.stopPropagation();
  }


  isString(tab: Array<any>): Boolean {
      return typeof tab[1] === 'string';
  }

  logout() {
    // this.authService.purgeAuth();
    this.router.navigateByUrl('/');
  }


}
