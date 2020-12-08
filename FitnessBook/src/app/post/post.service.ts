import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPost } from '../shared/interfaces/post';
import { IUser } from '../shared/interfaces/user';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class PostService {

  newPost: IPost | null;

  constructor(
    private http: HttpClient
  ) { }

  create(data): Observable<IPost<IUser>> {
    return this.http.post<IPost<IUser>>(`${apiUrl}/posts/create`, data, { withCredentials: true });
  }

  details(data): Observable<IPost> {
    return this.http.post(`${apiUrl}/posts/details`, data, { withCredentials: true }).pipe(
      tap((post: IPost) => this.newPost = post)
    )
  }

  all(): Observable<IPost<IUser>[]> {
    return this.http.get<IPost<IUser>[]>(`${apiUrl}/posts/all`, { withCredentials: true });
  }
}
