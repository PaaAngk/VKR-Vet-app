import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/graphql/generated';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  // getUser(){
  //   let user : User = {} as User;
  //   this.apiService.get('/user/me')
  //   .subscribe({
  //     next : (data) => {user = data as User}
  //   });
  //   return user;
  // }

  // // Update the user on the server (email, pass, etc)
  // update(user: User): Observable<User> {
  //   return this.apiService
  //   .put('/user', { user })
  //   .pipe(map(data => {
  //     // Update the currentUser observable
  //     this.currentUserSubject.next(data.user);
  //     return data.user;
  //   }));
  // }
}
