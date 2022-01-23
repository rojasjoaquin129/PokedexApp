import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { Types } from 'src/app/core/models/types';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  spiner: boolean = false;
  pokemon: any;
  formGrop: FormGroup;
  types$: Observable<Types[]> = new Observable<Types[]>();
  constructor(
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService,
    public toast: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGrop = this.fb.group({
      name: ['', [Validators.required]],
      lvl: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.spiner = true;
    this.activatedRouter.params.subscribe((params) => {
      this.pokemonService.getOnePokemon(params['id']).subscribe(
        (pokemon) => {
          this.types$ = this.pokemonService.getTypes();
          this.pokemon = pokemon;
          this.spiner = false;
          if (!this.pokemon) {
            this.toast.error(
              'Este supuesto pokemon no existe',
              'ERROR en Pokemon'
            );
            this.router.navigate(['list']);
          } else {
            this.formGrop.setValue({
              name: this.pokemon.name,
              lvl: this.pokemon.lvl,
              type: this.pokemon.type,
            });
          }
        },
        (err) => {
          this.spiner = false;
          this.toast.error(
            'Este supuesto pokemon no existe',
            'ERROR en Pokemon'
          );
          this.router.navigate(['list']);
        }
      );
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
  edit() {
    const { lvl, type, name } = this.formGrop.value;
    const pok: Pokemon = { ...this.pokemon, lvl, type, name };
    this.pokemonService.editPokemon(pok.id, pok).then(() => {
      this.toast.success(
        'Usted edito el pokemon con exito',
        'Edicion de Pokemon'
      );
      this.router.navigate(['list']);
    });
  }
  cancel() {
    this.toast.error('usted cancelo la edicion', 'Cancelacion de la edicion');
    this.router.navigate(['list']);
  }
}
