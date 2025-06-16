import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _roleUrl = `${environment.baseUrl}/roles`;
  constructor(private http: HttpClient) {}

  public getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this._roleUrl);
  }

  public createRole(role: any): Observable<Object> {
    return this.http.post(`${this._roleUrl}`, role);
  }

  public deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this._roleUrl}/${id}`);
  }

  public getRoleById(id: string): Observable<any> {
    return this.http.get<any>(`${this._roleUrl}/${id}`);
  }

  public editRole(id: string, role: any): Observable<Object> {
    return this.http.put(`${this._roleUrl}/${id}`, role);
  }

public getPublicRoles(): Observable<any[]> {
  return this.http.get<any[]>(`${this._roleUrl}/public/roles`);
}


}
