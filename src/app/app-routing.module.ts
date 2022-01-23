import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './core/guards/home.guard';
import { LoginGuard } from './core/guards/login.guard';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import(`./modules/home/home.module`).then((m) => m.HomeModule),
    canActivate: [HomeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
