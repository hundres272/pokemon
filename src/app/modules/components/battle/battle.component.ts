import { Component, OnInit } from '@angular/core';
import { DamageRelation, DoubleDamageFrom } from 'src/app/interfaces/damage-relations.interface';
import { Pokemon, Type } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StoreService } from 'src/app/services/store.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  pokemonList: Pokemon[] = [];
  typesPokemonOne: string[] = [];
  typesPokemonTwo: string[] = [];
  DamagesTypes: DoubleDamageFrom[] = [
    {name:'double_damage_from',url:''},
    {name:'double_damage_to',url:''},
    {name:'half_damage_from',url:''},
    {name:'half_damage_to',url:''},
    {name:'no_damage_from',url:''},
    {name:'no_damage_to',url:''}
  ]
  damageRelations: DamageRelation[] = [];
  accumulatorOne: number = 0;
  accumulatorTwo: number = 0;
  itemsOne: any[] = [];
  itemsTwo: any[] = [];
  urlImageOne: string = '';
  urlImageTwo: string = '';

  constructor(
    private storeService: StoreService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonList = this.storeService.obtenerListaPokemon();
    const pokemonIdImageOne = this.pokemonList[0].id < 10 ? `00${this.pokemonList[0].id}` : (this.pokemonList[0].id > 9 && this.pokemonList[0].id < 100 ? `0${this.pokemonList[0].id}` : `${this.pokemonList[0].id}`);
    const pokemonIdImageTwo = this.pokemonList[1].id < 10 ? `00${this.pokemonList[1].id}` : (this.pokemonList[1].id > 9 && this.pokemonList[1].id < 100 ? `0${this.pokemonList[1].id}` : `${this.pokemonList[1].id}`);
    this.urlImageOne = `/assets/151_pokemon/${pokemonIdImageOne}.png`
    this.urlImageTwo = `/assets/151_pokemon/${pokemonIdImageTwo}.png`
    this.process();
  }

  public process() {
    this.generateJsonByTypes(this.pokemonList[0].types);
    this.generateJsonByTypes(this.pokemonList[1].types);
  }

  private generateJsonByTypes(types: Type[]) {
    var obsTemp: Observable<DamageRelation>[] = [];
    types.forEach(item => obsTemp.push(this.pokemonService.tiposPokemon(item.type.name)))
    zip(obsTemp)
    .subscribe((res: DamageRelation[]) => {
      for (let i = 1; i < types.length; i++) {
        const element = res[i];
        element.double_damage_from.forEach(itemTwo => {
          if(!res[0].double_damage_from.find(itemOne => itemOne.name === itemTwo.name))
            res[0].double_damage_from.push(itemTwo);
        })        
        element.double_damage_to.forEach(itemTwo => {
          if(!res[0].double_damage_to.find(itemOne => itemOne.name === itemTwo.name))
            res[0].double_damage_to.push(itemTwo);
        })
        element.half_damage_from.forEach(itemTwo => {
          if(!res[0].half_damage_from.find(itemOne => itemOne.name === itemTwo.name))
            res[0].half_damage_from.push(itemTwo);
        })
        element.half_damage_to.forEach(itemTwo => {
          if(!res[0].half_damage_to.find(itemOne => itemOne.name === itemTwo.name))
            res[0].half_damage_to.push(itemTwo);
        })
        element.no_damage_from.forEach(itemTwo => {
          if(!res[0].no_damage_from.find(itemOne => itemOne.name === itemTwo.name))
            res[0].no_damage_from.push(itemTwo);
        })
        element.no_damage_to.forEach(itemTwo => {
          if(!res[0].no_damage_to.find(itemOne => itemOne.name === itemTwo.name))
            res[0].no_damage_to.push(itemTwo);
        })
      }
      this.damageRelations.push(res[0]);
      this.temp();  
    })
  }

  private temp(){
    if(this.damageRelations.length === 2){
      this.tempTwo(this.pokemonList[1],true);
      this.tempTwo(this.pokemonList[0],false);
    }
  }

  private tempTwo(elementTwo: Pokemon, orderInit: boolean) {
    var damage: DamageRelation;
    if(orderInit){
      damage = this.damageRelations[0];
    }else{
      damage = this.damageRelations[1];
    }
    elementTwo.types.forEach(itemTwoType=> {
      const noEsAtacadoFrom = damage.no_damage_from.find(itemOne => itemOne.name === itemTwoType.type.name)
      const noAtacaTo = damage.no_damage_to.find(itemOne => itemOne.name === itemTwoType.type.name)
      if (!noEsAtacadoFrom) {
        const findDoubleDamageFrom = damage.double_damage_from.find(itemOne => itemOne.name === itemTwoType.type.name);
        if(findDoubleDamageFrom) this.accumulator(orderInit, -70, 'double_damage_from', '-70');
        const findHalfDamageFrom = damage.half_damage_from.find(itemOne => itemOne.name === itemTwoType.type.name);
        if(findHalfDamageFrom) this.accumulator(orderInit, -30, 'half_damage_from', '-30');
      }
      if(!noAtacaTo) {
        const findDoubleDamageTo = damage.double_damage_to.find(itemOne => itemOne.name === itemTwoType.type.name);
        if(findDoubleDamageTo) this.accumulator(orderInit, 70, 'double_damage_to', '+70');
        const findHalfDamageTo = damage.half_damage_to.find(itemOne => itemOne.name === itemTwoType.type.name);
        if(findHalfDamageTo) this.accumulator(orderInit, 30, 'half_damage_to', '+30');
      }
    })
  }

  private accumulator(orderInit: boolean, amount: number, name: string, value: string) {
    if(orderInit){
      this.accumulatorOne+=amount;
      this.itemsOne.push(
        {
          name: name,
          value: value
        }
      )
    }else{
      this.accumulatorTwo+=amount;
      this.itemsTwo.push(
        {
          name: name,
          value: value
        }
      )
    }
  }
}
