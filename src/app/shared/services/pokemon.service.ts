import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { Types } from 'src/app/core/models/types';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  baseUrl: string = environment.baseUrl;
  baseApi: string = environment.baseApi;
  private typesColleccition: AngularFirestoreCollection<Types>;
  private pokemonCollection: AngularFirestoreCollection<Pokemon>;
  constructor(
    public fbStorage: AngularFireStorage,
    private http: HttpClient,
    private readonly afs: AngularFirestore
  ) {
    this.pokemonCollection = this.afs.collection('pokemons');
    this.typesColleccition = this.afs.collection('types');
  }

  getImg(path: string) {
    return this.fbStorage.ref(path).getDownloadURL();
  }
  addImg(file: any, path: string) {
    return this.fbStorage.upload(path, file);
  }
  getDescription(url: string) {
    return this.http.get(url);
  }
  getPokemons(index: number) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  addPokemons(pokemon: Pokemon) {
    const idP = this.afs.createId();
    pokemon.id = idP;
    return this.pokemonCollection.doc(idP).set(pokemon);
  }

  getAllPokemons() {
    return this.pokemonCollection.valueChanges() as Observable<Pokemon[]>;
  }

  getOnePokemon(id: string) {
    return this.pokemonCollection.doc(id).valueChanges() as Observable<Pokemon>;
  }

  editPokemon(id: string, pokemon: Pokemon) {
    return this.pokemonCollection.doc(id).update(pokemon);
  }

  deletePokemon(id: string) {
    return this.pokemonCollection.doc(id).delete();
  }
  getTypes() {
    return this.typesColleccition.valueChanges() as Observable<Types[]>;
  }
}
