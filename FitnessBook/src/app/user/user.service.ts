import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(
    private UserService: UserService
  ) { }

  login(data: IUser): Observable<IUser>{

  }
}
