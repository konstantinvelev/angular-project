import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPost } from '../shared/interfaces/post';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class PostService {

  newPost: IPost | null;

  constructor(
    private http: HttpClient
  ) { }

  create(data): Observable<IPost>{
    return this.http.post(`${apiUrl}/posts/new`,data, {withCredentials:true}).pipe(
      tap((post: IPost) => this.newPost = post )
    )
  }
}
