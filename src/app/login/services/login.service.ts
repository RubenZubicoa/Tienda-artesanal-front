import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { map, Observable } from 'rxjs';
import { mapUserToUser, User } from '../../core/models/User';
import { UserDB } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.LOGIN_URL;

  login(email: string, password: string): Observable<{ user: User, token: string }> {
    return this.http.post<{ user: UserDB, token: string }>(this.url, { email, password }).pipe(map((res) => ({ user: mapUserToUser(res.user), token: res.token })));
  }

  verifyToken(token: string): Observable<User> {
    return this.http.post<UserDB>(this.url + '/verify-token', { token }).pipe(map(mapUserToUser));
  }
}
