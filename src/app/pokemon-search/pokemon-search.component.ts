import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
  searchTerm: string = '';
  foundPokemon: Pokemon | undefined;


  pokemons$!: Observable<Pokemon[]>;
  selectedPokemon: Pokemon | null = null; // Variável para armazenar o Pokémon selecionado

  private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }



  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.pokemonService.searchPokemons(term)),
    );
  }


  showDetails(pokemon: Pokemon): void {
    // Ao selecionar um Pokémon na lista, obtenha seus detalhes da API
    this.pokemonService.getPokemon(pokemon.id).subscribe(pokemonDetails => {
      this.selectedPokemon = pokemonDetails;
    });
  }

}
