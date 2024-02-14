import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VerifyAuthService } from './Services/verify-auth.service';
import { UserRegistrationComponent } from './registration/user-registration/user-registration.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [VerifyAuthService] },
  { path: 'pokemons', component: PokemonsComponent, canActivate: [VerifyAuthService] },
  { path: 'detail/:id', component: PokemonDetailComponent, canActivate: [VerifyAuthService] },
  { path: 'userRegistration', component: UserRegistrationComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }

