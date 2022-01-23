import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss', './list-page.component.sass'],
})
export class ListPageComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  pokemonListFilter: Pokemon[] = [];
  classicMode: boolean = true;
  isLoading: boolean = false;
  search: string = '';
  listaTypos: string[] = [];
  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.isLoading = true;
    this.pokemonService.getAllPokemons().subscribe((result) => {
      this.pokemonList = result;
      this.pokemonListFilter = result;
      this.isLoading = false;
    });
  }

  filterList() {
    this.pokemonList = this.pokemonListFilter;
    const listFilter = this.pokemonListFilter.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(this.search.toLowerCase()) ||
        pokemon.type
          .toLocaleString()
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    });
    this.pokemonList = listFilter;
  }
  edit(id: string) {
    this.router.navigate(['edit/' + id]);
  }
  view(id: string) {
    this.router.navigate(['details/' + id]);
  }
  getPrincipalType(dato: string[]) {
    console.log(dato[0]);
    return dato[0];
  }
}
