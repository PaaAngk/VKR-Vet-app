import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HomeComponent {

  isAuthenticated: boolean | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private api: ApiService,
  ) {}


  // ngOnInit() : void {
    //this.api.get('/operation').subscribe((data) => console.log(data))

    // this.userService.isAuthenticated.subscribe(
    //   (authenticated) => {
    //     this.isAuthenticated = authenticated;

    //     // set the article list accordingly
    //     if (authenticated) {
    //       //this.setListTo('feed');
    //     } else {
    //       //this.setListTo('all');
    //     }
    //     this.cd.markForCheck();
    //   }
    // );

  // }

}
