import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'batalla-pokemon';
  cantidadPokemons = 151;
  
  constructor() { }

  ngOnInit(): void {
  }

}
