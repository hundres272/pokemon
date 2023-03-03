import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  src: string = '';
  name: string = '';
  types: string[] = [];
  typesDynamic: any = {};
  init: boolean = true;
  selection: boolean = false;
  pokemon?: Pokemon;
  
  @Input() pokemonId:number = 0;
  
  constructor(
    private pokemonService: PokemonService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    const pokemonIdImage = this.pokemonId < 10 ? `00${this.pokemonId}` : (this.pokemonId > 9 && this.pokemonId < 100 ? `0${this.pokemonId}` : `${this.pokemonId}`);
    this.selection = this.storeService.buscarCoincidencia(this.pokemonId);
    this.pokemonService.obtenerPokemon(this.pokemonId)
    .subscribe((pokemonResponse: Pokemon)=> {
      this.pokemon = pokemonResponse;
      this.name = pokemonResponse.name;
      this.types = pokemonResponse.types.map(item => item.type.name);
      this.typesDynamic = this.types.length === 1 ? {'margin-top.px':8,'margin-bottom.px':8,} : '';
    })

    // this.pokemonService.tiposPokemon(this.pokemonId)
    // .subscribe((tipePokemonResp: TipoPokemon)=> {
    //   console.log("tipePokemonResp ",tipePokemonResp);
      
    // })
    
    this.src = `/assets/151_pokemon/${pokemonIdImage}.png`;
  }

  public verifySelection() {
    const pokemons:number = this.storeService.cantidadPokemon();
    if (!this.selection) {
      if (pokemons < 2) {
        if(this.pokemon){
          this.storeService.aniadirPokemon(this.pokemon);
          this.selection = true;
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo puedes seleccionar 2 pokemon para la batalla'
        })
      }
    }else{
      if (this.pokemon) {
        this.storeService.deseleccionarPokemon(this.pokemon);
        this.selection = false;
      }
    }
  }
}
