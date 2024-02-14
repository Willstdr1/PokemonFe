import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ARBOK = 'ARBOK';
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
  // Índices das posições específicas dos Pokémon 
    const specificPositions = [ 0, 3, 6, 132, 24 ]; // posições específicas

  this.pokemonService.getPokemons()
    .subscribe(pokemons => {
      // Filtra os Pokémon nas posições específicas
      this.pokemons = pokemons.filter((pokemon, index) => specificPositions.includes(index));
    });
  }
}
