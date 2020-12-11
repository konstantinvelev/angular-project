import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../shared/interfaces/comment';
import { IPost } from '../shared/interfaces/post';
import { IUser } from '../shared/interfaces/user';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentPost: IPost | null;

  constructor(
    private http: HttpClient
  ) { }

  create(data): Observable<IPost<IUser>> {
    return this.http.post<IPost<IUser>>(`${apiUrl}/posts/create`, data, { withCredentials: true }).pipe(
      tap((post: IPost) => this.currentPost = post)
    );
  }

  edit(data): Observable<IPost<IUser>> {
    return this.http.post<IPost<IUser>>(`${apiUrl}/posts/edit/${data.postId}`, data.formData, { withCredentials: true }).pipe(
      tap((post: IPost) => this.currentPost = post)
    );
  }

  details(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${apiUrl}/posts/details/${id}`, { withCredentials: true });
  }

  all(): Observable<IPost<IUser>[]> {
    return this.http.get<IPost<IUser>[]>(`${apiUrl}/posts/all`, { withCredentials: true });
  }

  delete(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/posts/delete/${id}`, { withCredentials: true });
  }

  like(data): Observable<any> {
    return this.http.put<any>(`${apiUrl}/posts/like/${data.postId}`, data.user, { withCredentials: true });
  }
}
