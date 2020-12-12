import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IComment } from '../shared/interfaces/comment';
import { IUser } from '../shared/interfaces/user';

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

  getAllForPost(id): Observable<IComment<IUser>[]> {
    return this.http.get<IComment<IUser>[]>(`${apiUrl}/comments/all/${id}`, { withCredentials: true });
  }

  editComment(data): Observable<any>{
    return this.http.put<any>(`${apiUrl}/comments/edit/${data.commentId}`, {content: data.content, user: data.user}, { withCredentials: true });
  }

  deleteComment(data): Observable<any> {
    return this.http.get<any>(`${apiUrl}/comments/delete/${data.commentId}?postId=${data.postId}&userId=${data.userId}`, { withCredentials: true });
  }

  likeComment(data): Observable<any> {
    return this.http.put<any>(`${apiUrl}/comments/like/${data.commentId}`, data.user, { withCredentials: true });
  }
}

