import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../core/config/api.config';
import { map, Observable } from 'rxjs';
import { mapUserToUser, User, UserDB } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.USERS_URL;
  private readonly http = inject(HttpClient);

  
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<UserDB>(this.url + '/' + email).pipe(map(mapUserToUser));
  }

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.url, user);
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(this.url, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + userId);
  }
}
