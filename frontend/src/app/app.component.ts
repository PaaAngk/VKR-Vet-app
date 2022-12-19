import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'vet-crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
	title = 'App';

	constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title ) {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => {
				let child = this.activatedRoute.firstChild;
				while (child) {
					if (child.firstChild) {
						child = child.firstChild;
					} else if (child.snapshot.data &&    child.snapshot.data['title']) {
						return child.snapshot.data['title'];
					} else {
						return null;
					}
				}
				return null;
			})
		).subscribe( (data: any) => {
			if (data) {
				this.titleService.setTitle(data);
			}
		});
	}
	
	ngOnInit() {
		this.authService.populate();
	}
}
