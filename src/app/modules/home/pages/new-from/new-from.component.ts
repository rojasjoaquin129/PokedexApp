import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { Types } from 'src/app/core/models/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogExplicacionComponent } from 'src/app/shared/components/dialog-explicacion/dialog-explicacion.component';
import { Pokemon } from 'src/app/core/models/pokemon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-from',
  templateUrl: './new-from.component.html',
  styleUrls: ['./new-from.component.scss'],
})
export class NewFromComponent implements OnInit {
  isLoading: boolean = false;
  urlFile: string = '';
  formGrop: FormGroup;
  imag$: Observable<any> = new Observable<any>();
  types$: Observable<Types[]> = new Observable<Types[]>();
  abilit: any;

  constructor(
    private servicePokemon: PokemonService,
    private fb: FormBuilder,
    public views: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.formGrop = this.fb.group({
      name: ['', [Validators.required]],
      lvl: ['', [Validators.required]],
      type: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.types$ = this.servicePokemon.getTypes();

    this.servicePokemon
      .getOnePokemon('0DOzPTRNJsty8H6Ja9Q5')
      .subscribe((result) => {
        this.abilit = result.abilities;
      });
  }
  view() {
    this.views.open(DialogExplicacionComponent);
  }

  addImg(event: any) {
    let name: string = '';
    this.isLoading = true;
    const file = event.target.files[0];
    if (this.formGrop.value.name) {
      name = this.formGrop.value.name;
    } else {
      name = file.name;
    }
    this.servicePokemon.addImg(file, 'pokemon/' + name);
    timer(3000).subscribe(() => {
      this.servicePokemon.getImg('pokemon/' + name).subscribe((url) => {
        this.formGrop.controls['img'].setValue(url);
        this.isLoading = false;
      });
    });
  }
  isValidField(field: string) {
    return (
      (this.formGrop.get(field)?.touched || this.formGrop.get(field)?.dirty) &&
      !this.formGrop.get(field)?.valid
    );
  }

  getErrorMessage(field: string) {
    let message;
    if (this.formGrop.get(field)?.errors?.['required']) {
      message = 'El campo ' + field + ' no puede estar vacio';
    } else if (this.formGrop.get(field)?.hasError('invalid')) {
      message = 'No es un formato valido  ';
    }
    return message;
  }
  agregar() {
    const { name, lvl, type, img } = this.formGrop.value;
    console.log(this.formGrop.value);
    let Pokemon: Pokemon = {
      name: name,
      lvl: lvl,
      type: type,
      image: img,
      id: 'sdasd',
      abilities: this.abilit,
    };
    this.servicePokemon
      .addPokemons(Pokemon)
      .then(() => {
        this.toastr.success(
          'Se agrego con exito el pokemon',
          'Agregar Pokemon'
        );
        this.router.navigate(['list']);
        this.formGrop.reset();
      })
      .catch((error) => {
        this.toastr.error(
          'algo paso en la carga del pokemon',
          'Agregar Pokemon'
        );
        this.formGrop.reset();
      });
  }
}
