import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RolGuard } from './auth/rol.guard';
import { VoteGuard } from './auth/vote.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ConsumoComponent } from './components/consumo/consumo.component';
import { HomeComponent } from './components/home/home.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { MetodoComponent } from './components/metodo/metodo.component';
import { ReservaComponent } from './components/reserva/reserva.component';


const routes: Routes = [
  {path: '',redirectTo:'login' , pathMatch: 'full'},
  {path: 'productos', component: ProductComponent},
  {path: 'reserva', component: ReservaComponent},
  {path: 'consumo', component: ConsumoComponent},
  {path: 'habitacion', component: HabitacionComponent},
  {path: 'metodo', component: MetodoComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component :LoginComponent},
  {path: 'register', component :RegisterComponent},
  {path: 'users', component :UsersComponent, canActivate:[RolGuard]},
  {path: '**', redirectTo: 'dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
