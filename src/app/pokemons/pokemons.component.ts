import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],

})

export class PokemonsComponent {

  pokemons: Pokemon[] = [];

  selectedPokemon?: Pokemon;
  itemsPerPage = 48; 
  currentPage = 1; 

  constructor(private pokemonService: PokemonService, private messageService: MessageService) { }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.messageService.add(`PokemonsComponent: Selected pokemon id=${pokemon.id}`);
  }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons);
  }

  getPokemonSpriteUrl(id: number): string {
    return this.pokemonService.getPokemonSpriteUrlById(id);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.pokemonService.addPokemon({ name } as Pokemon)
      .subscribe(pokemon => {
        this.pokemons.push(pokemon);
      });
  }

  delete(pokemon: Pokemon): void {
    this.pokemons = this.pokemons.filter(h => h !== pokemon);
    this.pokemonService.deletePokemon(pokemon.id).subscribe();
  }


}




