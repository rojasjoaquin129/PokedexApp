import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { liftInitialState } from '@ngrx/store-devtools/src/reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let auths = localStorage.getItem('uid');
    if (auths) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
