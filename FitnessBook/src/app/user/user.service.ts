import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: IUser | null;
  userById: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUserProfile(): Observable<any> {
    return this.http.get(`${apiUrl}/users/profile`, { withCredentials: true }).pipe(
      tap(((user: IUser) => this.currentUser = user)),
      catchError(() => { this.currentUser = null; return of(null); })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/users/login`, data, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  register(data: any): Observable<IUser> {
    return this.http.post(`${apiUrl}/users/register`, data, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    )
  }

  logout(): Observable<any> {
    return this.http.post(`${apiUrl}/users/logout`, { withCredentials: true }).pipe(
      tap(() => this.currentUser = null)
    );
  }

  editProfile(data): Observable<IUser>{
    return this.http.put(`${apiUrl}/users/profile`, data.formData, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    )
  }
}
