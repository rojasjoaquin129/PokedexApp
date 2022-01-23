import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewFromComponent } from './pages/new-from/new-from.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'list' },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'new', component: NewFromComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'edit/:id', component: EditComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
