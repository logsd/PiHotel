import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Reserva } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion.service';
import * as moment from 'moment';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [HabitacionService, LoginService, ReservaService]
})
export class ReservaComponent implements OnInit{
  constructor(public habitacionService: HabitacionService, public loginService: LoginService, public reservaService : ReservaService) { }

estado1 = true;    
  tipo1 = "In Situs"
  reserva = new Reserva();
  ngOnInit(): void {
    this.getReservas()
    this.getHabitaciones()
    console.log(this.loginService.getUser())
  }

  addReserva(form: NgForm){
    if(form.value._id){
      this.reservaService.putReserva(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reserva Actualizada Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getReservas()

        })
    } else {
      this.reservaService.postReserva(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Reserva creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getReservas()
      },
      error : (e:HttpErrorResponse)=>{
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La Reserva ya existe!',

        })
      }
      })
    }
  }

  reservando(form: NgForm){
  this.reserva.cliente = this.loginService.getUser();
  this.reserva.habitacion = form.value._id;
  this.reserva.tipoReserva  = this.tipo1;
  this.reserva.fechaReserva = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.reserva.fechaEntrada = moment(form.value.fechaEntrada).subtract(10, 'days').calendar(); 
  this.reserva.fechaSalida= moment(form.value.fechaSalida).subtract(10, 'days').calendar();
  this.reserva.costoAlojamiento = form.value.costoAlojamiento;
  this.reserva.estado = this.estado1;
  this.reservaService
  .postReserva(this.reserva)
  .subscribe(
    
    (res) => {
      this.resetForm(form)

      Swal.fire(
        'Postulación Exitosa',
        '',
        'success'
      );
      
      this.getReservas()
    },
    (err) => {
      console.error(err);
      Swal.fire("Ya te postulaste a esta oferta",  "anteriormente", 'error');
    }
  );



  }

  getHabitaciones(){
    this.habitacionService.getHabitaciones()
      .subscribe(res => {
        this.habitacionService.habitaciones =res as Habitacion[];
      });
  }

  getReservas(){
    this.reservaService.getReservas()
      .subscribe(res => {
        this.reservaService.reservas =res as Reserva[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.reservaService.selectedReserva = new Reserva();
    }
  }

  editHabitacion(habitacion: Habitacion){
    this.habitacionService.selectedHabitacion = habitacion;
  }

  editReserva(reserva: Reserva){
    this.reservaService.selectedReserva = reserva;
  }

  deleteReserva(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar esta Reserva',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.reservaService.deleteReserva(_id)
      .subscribe(res =>{
        this.getReservas();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Habitacion no eliminada', '', 'info')
      }
    })

  }
}
