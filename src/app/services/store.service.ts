import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private miListaPokemon: Pokemon[] = [];
  private misPokemon = new BehaviorSubject<Pokemon[]>([]);

  misPokemon$ = this.misPokemon.asObservable();

  constructor() { 
    const pokemons = localStorage.getItem('pokemons');
    if (pokemons) {
      this.miListaPokemon = JSON.parse(pokemons);
      this.misPokemon.next(this.miListaPokemon);
    }
  }

  aniadirPokemon(pokemon: Pokemon) {
    this.miListaPokemon.push(pokemon);
    this.misPokemon.next(this.miListaPokemon);
    localStorage.setItem('pokemons',JSON.stringify(this.miListaPokemon));
  }

  deseleccionarPokemon(pokemon: Pokemon) {
    this.miListaPokemon = this.miListaPokemon.filter(item => item.id !== pokemon.id);
    this.misPokemon.next(this.miListaPokemon);
    localStorage.setItem('pokemons',JSON.stringify(this.miListaPokemon));
  }

  obtenerListaPokemon() {
    return this.miListaPokemon;
  }

  cantidadPokemon() {
    return this.miListaPokemon.length;
  }

  buscarCoincidencia(idPokemon: number) {
    if(this.miListaPokemon.find(item => item.id === idPokemon)) return true;
    return false;
  }
}
