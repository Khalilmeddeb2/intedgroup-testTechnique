import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector :Injector) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userService = this.injector.get(UserService);
    const token = userService.getToken();

    const tokenReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(tokenReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si le token est expiré
       if (
          error.status === 401 &&
          error.error?.message === 'access_token_expired' &&
          !req.url.includes('/refresh')
        ) {
          return userService.refreshToken().pipe(
            switchMap((data: any) => {
              localStorage.setItem('token', data.accessToken);
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.accessToken}`
                }
              });
              return next.handle(newReq);
            }),
            catchError(err => {
              userService.clearSession();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
 