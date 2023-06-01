/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/core';
import { User } from 'src/graphql/generated';


@Directive({ selector: '[disableForRole]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  ifRoles!: Array<string>;

  @Input() set disableForRole(condition: Array<string>) {
    this.ifRoles = condition;
  }

  ngOnInit() {
    this.userService.currentUser.pipe(take(1)).subscribe(
      (isAuthenticated: User) => {
        // user Role are checked by a Roles mention in DOM
        const idx = this.ifRoles.indexOf(isAuthenticated.role);
        if (idx < 0) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }
}
