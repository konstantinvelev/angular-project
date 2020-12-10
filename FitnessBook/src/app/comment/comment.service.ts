import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../shared/interfaces/comment';

const apiUrl = environment.apiUrl;

@Injectable()
export class CommentService {

  newComment: IComment | null;

  constructor(
    private http: HttpClient
  ) { }

  postComment(data): Observable<IComment> {
    return this.http.post<IComment>(`${apiUrl}/comments/create`, data, { withCredentials: true }).pipe(
      tap((comment: IComment | null) => this.newComment = comment)
    )
  }

  getAllForPost(id): Observable<IComment<string>[]> {
    return this.http.get<IComment<string>[]>(`${apiUrl}/comments/all`, { withCredentials: true });
  }
}

