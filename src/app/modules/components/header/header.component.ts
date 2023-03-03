import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pokemonsBattle: Pokemon[] = [];
  counter: number = 0;

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {
    this.storeService.misPokemon$.subscribe(pokemon => {
      this.counter = pokemon.length;
    });
  }

  ngOnInit(): void {
    if (this.counter > 0) {
      this.pokemonsBattle = this.storeService.obtenerListaPokemon();
    }
  }

  public irALaBatalla() {
    if(this.counter === 2) {
      this.router.navigate(['/battle']);
    }else{
      Swal.fire({
        title: 'Un momento...',
        imageUrl: '/assets/images/oak.png',
        imageHeight: 200,
        text: 'Debes seleccionar al menos 2 pokemon para la batalla'
      })
    }
  }

}
