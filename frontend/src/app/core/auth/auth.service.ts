import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { ApiService, JwtService } from 'src/app/core/services';
import { AuthUser } from 'src/app/core/models/auth-user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Apollo } from 'apollo-angular';
import { CurrentUserProfileGQL, LoginGQL, LoginInput, User } from 'src/graphql/generated';

// const GET_ME = gql`
//   query CurrentUserProfile {
//     me {
//       id
//       fullName
// 	  login
//     }
//   }
// `

@Injectable()
export class AuthService
{ 
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
    constructor (
      private userService: UserService,
      private apiService: ApiService,
      private jwtService: JwtService,

	  //Apollo
	  private apollo: Apollo,
	  private currentUserProfileGQL: CurrentUserProfileGQL,
	  private loginGQL:LoginGQL
    ) {}
  
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
		// If JWT detected, attempt to get & store user's info
		if (this.jwtService.getToken()) {
			// this.apiService.get('/user/me')
			// .subscribe({
			// 	next : (data) => {this.setAuth(this.jwtService.getToken())},
			// 	error: (e)  => {this.purgeAuth()}
			// });
			this.currentUserProfileGQL.watch()
			.valueChanges.subscribe({
				next : (data) => {this.setAuth(this.jwtService.getToken())},
				error: (error)  => {this.purgeAuth()}
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
		// .subscribe({
		// 	next : (data) => {console.log(data.data?.login.accessToken)},
		// 	error: (error)  => {console.log(error)}
		// });
		// return of([])
		// return this.apiService.post(`/auth/sign-in`, formData)
		// .pipe(
		// 	map((token) => {
		// 	if (token.length == 0) {
		// 		return token;
		// 	}
		// 	else{
		// 		this.setAuth(token.access_token);
		// 	}
		// 	return token;
		// 	}),
		// 	take(1)
		// );
	}
}
