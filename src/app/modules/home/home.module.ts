import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsComponent } from './pages/details/details.component';
import { NewFromComponent } from './pages/new-from/new-from.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    HomePageComponent,
    DetailsComponent,
    NewFromComponent,
    ListPageComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
