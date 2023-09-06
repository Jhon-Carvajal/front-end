import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public miServicioUser: UserService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.miServicioUser.usuarioSesionActiva) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.miServicioUser.usuarioSesionActiva.token}`
        }
      });
    };

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.router.navigateByUrl('/dashboard');
        return throwError(err);
      })
    );
  };
};