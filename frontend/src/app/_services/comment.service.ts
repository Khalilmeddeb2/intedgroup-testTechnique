import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    private _commentUrl=`${environment.baseUrl}/comments`
      constructor(private http: HttpClient) { }
  
        getCommentsByPost(idPost :string) :Observable <any> {
          return this.http.get(`${this._commentUrl}/${idPost}`);
          }
     
          addComment(postId: string, comment: any): Observable<any> {
            return this.http.post(`${this._commentUrl}/${postId}`, comment);
          }
        }          
