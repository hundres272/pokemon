import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { DetallePokemonComponent } from './components/detalle-pokemon/detalle-pokemon.component';
import { HeaderComponent } from './components/header/header.component';
import { BattleComponent } from './components/battle/battle.component';


@NgModule({
  declarations: [
    HomeComponent,
    PokemonComponent,
    DetallePokemonComponent,
    HeaderComponent,
    BattleComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
