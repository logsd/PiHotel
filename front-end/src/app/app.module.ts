import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ConsumoComponent } from './components/consumo/consumo.component';
import { HomeComponent } from './components/home/home.component';
import { MetodoComponent } from './components/metodo/metodo.component';
import { ReservaComponent } from './components/reserva/reserva.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    NavComponent,
    HabitacionComponent,
    DashboardComponent,
    RegisterComponent,
    ProductComponent,
    ConsumoComponent,
    HomeComponent,
    MetodoComponent,
    ReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
