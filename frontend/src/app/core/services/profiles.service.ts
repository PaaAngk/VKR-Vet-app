import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor (
    private apiService: ApiService
  ) {}

  get(login: string): Observable<Profile> {
    return this.apiService.get('/profiles/' + login)
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

}
