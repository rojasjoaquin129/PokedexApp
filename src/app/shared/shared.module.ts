import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { DialogExplicacionComponent } from './components/dialog-explicacion/dialog-explicacion.component';

@NgModule({
  declarations: [NavbarComponent, DialogComponent, DialogExplicacionComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, DialogComponent],
})
export class SharedModule {}
