import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  img: boolean = false;
  spiner: boolean = false;
  pokemon: any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService,
    public views: MatDialog,
    public toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spiner = true;
    this.activatedRouter.params.subscribe((params) => {
      this.pokemonService.getOnePokemon(params['id']).subscribe(
        (pokemon) => {
          this.pokemon = pokemon;
          this.spiner = false;
          if (!this.pokemon) {
            this.toast.error(
              'Este supuesto pokemon no existe',
              'ERROR en Pokemon'
            );
            this.router.navigate(['list']);
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

  description(dato: any, name: string) {
    this.pokemonService.getDescription(dato.url).subscribe((result: any) => {
      const description = result.effect_entries[1].effect;
      const name = result.name;
      this.views.open(DialogComponent, { data: { name, description } });
    });
  }
}
