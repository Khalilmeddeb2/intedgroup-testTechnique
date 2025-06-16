import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userURL=`${environment.baseUrl}/users`
  constructor(private http: HttpClient, 
              private tokenStorageService :TokenStorageService ,
              private router :Router) { }

  loginUser(user : any)
  {
  return this.http.post(`${this._userURL}/login`,user);
  }

  singup(user :any)
  {
    return this.http.post(`${this._userURL}/signUp`,user);
  }

  getToken()
  {
  return localStorage.getItem('token')
  } 

 loggedIn()
{
  return !!localStorage.getItem('token')
 }

logout() {
  const refreshToken = localStorage.getItem('refreshToken');
  return this.http.post(`${this._userURL}/logout`, { token: refreshToken });
}

refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  return this.http.post(`${this._userURL}/refresh`, { token: refreshToken });
}

clearSession(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('refreshToken');
  this.tokenStorageService.removeUser(); // si tu as une méthode dédiée dans ton service
  this.router.navigate(['connexion'])
}
}
