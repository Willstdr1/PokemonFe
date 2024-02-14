import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './Main/app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { FormsModule } from '@angular/forms';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HttpClientModule } from '@angular/common/http';

import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { HighlightcursorDirective } from './Directives/highlightcursor.directive';
import { httpInterceptorProviders } from './interceptors/httpInterceptorProviders';
import { UserRegistrationComponent } from './registration/user-registration/user-registration.component';
import { ReversePipe } from './Pipes/reverse.pipe';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    MessagesComponent,
    PokemonDetailComponent,
    DashboardComponent,
    PageNotFoundComponent,
    PokemonSearchComponent,
    HighlightcursorDirective,
    UserRegistrationComponent,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
