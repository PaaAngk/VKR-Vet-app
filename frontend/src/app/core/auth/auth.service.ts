import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { JwtService } from 'src/app/core/services';
import { AuthUser } from 'src/app/core/models/auth-user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Apollo } from 'apollo-angular';
import { CurrentUserProfileGQL, LoginGQL, LoginInput, User } from 'src/graphql/generated';


@Injectable()
export class AuthService
{ 
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    constructor (
      private userService: UserService,
      private jwtService: JwtService,

	  //Apollo
	  private apollo: Apollo,
	  private currentUserProfileGQL: CurrentUserProfileGQL,
	  private loginGQL:LoginGQL,
    ) {}
  
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
		// If JWT detected, attempt to get & store user's info
		if (this.jwtService.getToken()) {

			this.currentUserProfileGQL.watch()
			.valueChanges.subscribe({
				next : () => {this.setAuth(this.jwtService.getToken())},
				error: ()  => {this.purgeAuth()}
			});
		} else {
			// Remove any potential remnants of previous auth states
			this.purgeAuth();
		}
    }

    setAuth(access_token: String) {
		// Save JWT sent from server in localstorage
		this.jwtService.saveToken(access_token);
		
		this.currentUserProfileGQL.watch()
		.valueChanges.subscribe({
			next : (data) => {
				const userSub = data.data.me as User
				// Set current user data into observable
				this.userService.currentUserSubject.next(userSub);
				// Set isAuthenticated to true
				this.isAuthenticatedSubject.next(true);
			}
		});
      
    }
  
    purgeAuth() {
		// Remove JWT from localstorage
		this.jwtService.destroyToken();
		// Set current user to an empty object
		this.userService.currentUserSubject.next({} as User);
		// Set auth status to false
		this.isAuthenticatedSubject.next(false);
    }
  
    attemptAuth(type: string, user: AuthUser): Observable<any> {
		const credentials = {
			login: user.login,
			password: user.password
		} as LoginInput

		return this.loginGQL.mutate({
			data:credentials
		})
		.pipe(
			map((data) => {
				if (!data.data?.login) {
					return data.data?.login.user;
				}
				else{
					this.setAuth(data.data?.login.accessToken);
				}
				return data.data?.login.user;
			}),
			take(1)
		)
	}
}
