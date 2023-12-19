import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
  providers: [HabitacionService]
})
export class HabitacionComponent implements OnInit {
  constructor(public habitacionService: HabitacionService) { }

  ngOnInit(): void {
    this.getHabitaciones()
  }

  addHabitacion(form: NgForm){
    if(form.value._id){
      this.habitacionService.putHabitacion(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Habitacion Actualizada Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getHabitaciones()

        })
    } else {
      this.habitacionService.postHabitacion(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Habitacion creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getHabitaciones()
      },
      error : (e:HttpErrorResponse)=>{
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La habitacion ya existe!',

        })
      }
      })
    }
  }



  getHabitaciones(){
    this.habitacionService.getHabitaciones()
      .subscribe(res => {
        this.habitacionService.habitaciones =res as Habitacion[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.habitacionService.selectedHabitacion = new Habitacion();
    }
  }

  editHabitacion(habitacion: Habitacion){
    this.habitacionService.selectedHabitacion = habitacion;
  }

  deleteHabitacion(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar esta Habitacion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.habitacionService.deleteHabitacion(_id)
      .subscribe(res =>{
        this.getHabitaciones();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Habitacion no eliminada', '', 'info')
      }
    })

  }
}
