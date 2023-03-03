import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss']
})
export class DetallePokemonComponent implements OnInit {
  src: string = '';
  pokemon?: Pokemon;
  name: string = '';
  types: string[] = [];
  pokemonId: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonId = Number(this.activatedRoute.snapshot.params['pokemonId']);
    const pokemonIdImage = this.pokemonId < 10 ? `00${this.pokemonId}` : (this.pokemonId > 9 && this.pokemonId < 100 ? `0${this.pokemonId}` : `${this.pokemonId}`);

    this.pokemonService.obtenerPokemon(this.pokemonId)
    .subscribe((pokemonResponse: Pokemon) => {
      this.pokemon = pokemonResponse;
      this.types = pokemonResponse.types.map(item => item.type.name);
      this.src = `/assets/151_pokemon/${pokemonIdImage}.png`;
    })
  }
}
