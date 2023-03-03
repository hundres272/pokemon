import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DamageRelation } from '../interfaces/damage-relations.interface';
import { Pokemon } from '../interfaces/pokemon.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public obtenerPokemon(idPokemon: number) {
    const route = `${this.baseUrl}/pokemon/${idPokemon}`;
    return this.http.get<Pokemon>(route);
  }

  public tiposPokemon(name: string) {
    const route = `${this.baseUrl}/type/${name}`;
    return this.http.get<DamageRelation>(route)
    .pipe(
      map((res: any) => res.damage_relations)
    )
  }
}
