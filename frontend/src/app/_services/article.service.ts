import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

 private _ArticleURL=`${environment.baseUrl}/articles`
 constructor(private http: HttpClient) { }

    uploadImage(image,key):Observable <any> {
    return this.http.post(`${this._ArticleURL}/upload/image/${key}`,image);
    }

    getArticles() :Observable <any> {
     return this.http.get(`${this._ArticleURL}`);
     }

     createArticle(article: any):Observable<Object> {
       return this.http.post(`${this._ArticleURL}`,article);
     }
     
     deleteArticle(id : string)
     {
       return this.http.delete(`${this._ArticleURL}/${id}`);
     } 

    getArticleById(id : string):Observable<any>
     {
       return this.http.get<any>(`${this._ArticleURL}/${id}`);
     } 
     
     editArticle(id:string,article:any):Observable<Object> {
       return this.http.put(`${this._ArticleURL}/${id}`,article);
     }

      likeArticle(id:string):Observable<Object> {
        return this.http.put(`${this._ArticleURL}/like/${id}`,{});
      }

      incrementView(articleId: string): Observable<any> {
        return this.http.patch<any>(`${this._ArticleURL}/increment-view/${articleId}`, {});
      }

      shareArticle(articleId: string): Observable<any> {
        return this.http.patch<any>(`${this._ArticleURL}/share/${articleId}`, {});
      }

      getArticleStatistics(): Observable<any[]> {
        return this.http.get<any[]>(`${this._ArticleURL}/statistics`);
      }

}
