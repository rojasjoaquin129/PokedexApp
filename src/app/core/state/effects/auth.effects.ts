import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  loginFail,
  loginStart,
  loginSuccess,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  logOut,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action) =>
        from(this.service.login(action.email, action.password)).pipe(
          map((data) => ({
            type: LOGIN_SUCCESS,
            token: data.user?.uid,
            email: action.email,
          })),
          catchError(() => of({ type: LOGIN_FAIL }))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          localStorage.setItem('uid', action.token);
          localStorage.setItem('email', action.email);
          this.router.navigate(['/list']);
        })
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFail),
        tap((action) => {
          this.toast.error(
            'Error en el correo y/o contraseña ',
            'NO PUDO LOGEAR'
          );
          this.router.navigate(['auth/login']);
        })
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOut),
        tap((action) => {
          this.service.logOut().then(() => {
            localStorage.removeItem('uid');
            localStorage.removeItem('email');
            this.router.navigate(['auth/login']);
          });
        })
      ),
    { dispatch: false }
  );
}
