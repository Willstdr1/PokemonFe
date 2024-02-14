import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonUrl = 'http://softwium.com/api/pokemons';  // URL to web api
  private spriteApiUrl = 'http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PokemonService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }

  //public getPokemons(): Observable<Pokemon[]> {
  //  return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
  //    map((pokemons: Pokemon[]) => {
  //      const uniquePokemons = pokemons.filter((pokemon, index, self) =>
  //        index === self.findIndex((p) => (
  //          p.id === pokemon.id
  //        ))
  //      );
  //      return uniquePokemons.slice(0, 400);
  //    })
  //  );
  //}

  /** GET pokemons from the server */
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonUrl)
      .pipe(
        tap(_ => this.log('fetched pokemons')),
        catchError(this.handleError<Pokemon[]>('getPokemons', []))
      );
  }


  /** GET Pokemon by id. Will 404 if id not found */
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /** GET Pokemon sprite by id */
  getPokemonSpriteUrlById(id: number) {
    return `${this.spriteApiUrl}/${id}.png`;
  }

  /** PUT: update the Pokemon on the server */
  updatePokemon(pokemon: Pokemon): Observable<any> {
    return this.http.put(this.pokemonUrl, pokemon, this.httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new Pokemon to the server */
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonUrl, pokemon, this.httpOptions).pipe(
      tap((newPokemon: Pokemon) => this.log(`added pokemon w/ id=${newPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  /** DELETE: delete the Pokemon from the server */
  deletePokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.delete<Pokemon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('deletePokemon'))
    );
  }

  ///* GET Pokemons whose name contains search term */
  //searchPokemons(term: string): Observable<Pokemon[]> {
  //  if (!term.trim()) {
  //    // if not search term, return empty Pokemon array.
  //    return of([]);
  //  }
  //  return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
  //    tap(x => x.length ?
  //      this.log(`found pokemon matching "${term}"`) :
  //      this.log(`no pokemon matching "${term}"`)),
  //    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  //  );
  //}
  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      return of([]);
    }

    const id = Number(term);
    //let url: string;

  //  if (isNaN(id)) {
  //    // Search by name
  //    url = `${this.pokemonUrl}/?name=${term}`;
  //  } else {
  //    // Search by ID
  //    url = `${this.pokemonUrl}/${id}`;
  //  }

  //  return this.http.get<Pokemon[]>(url).pipe(
  //    tap(_ => this.log(`found pokemon matching "${term}"`)),
  //    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  //  );
    //}

    if (isNaN(id)) {
      // Search by name
      const url = `${this.pokemonUrl}/?name=${term}`;
      return this.http.get<Pokemon[]>(url).pipe(
        tap(_ => this.log(`found pokemon matching "${term}"`)),
        catchError(this.handleError<Pokemon[]>('searchPokemons', []))
      );
    } else {
      // Search by ID
      return this.getPokemon(id).pipe(
        map(pokemon => [pokemon]), // Wrap the single Pokemon in an array
        catchError(this.handleError<Pokemon[]>('searchPokemons', []))
      );
    }

  }
}

