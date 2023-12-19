import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Metodo } from 'src/app/models/metodo';
import { MetodoService } from 'src/app/services/metodo.service';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.component.html',
  styleUrls: ['./metodo.component.css'],
  providers: [MetodoService]
})
export class MetodoComponent implements OnInit  {
  constructor(public metodoService: MetodoService) { }

  ngOnInit(): void {
    this.getMetodos()
  }

  addMetodo(form: NgForm){
    if(form.value._id){
      this.metodoService.putMetodo(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Metodo Actualizado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getMetodos()

        })
    } else {
      this.metodoService.postMetodo(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Metodo creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getMetodos()
      },
      error : (e:HttpErrorResponse)=>{
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El metodo ya existe!',

        })
      }
      })
    }
  }



  getMetodos(){
    this.metodoService.getMetodos()
      .subscribe(res => {
        this.metodoService.metodos =res as Metodo[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.metodoService.selectedMetodo = new Metodo();
    }
  }

  editMetodo(metodo: Metodo){
    this.metodoService.selectedMetodo = metodo;
  }

  deleteMetodo(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar este Metodo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.metodoService.deleteMetodo(_id)
      .subscribe(res =>{
        this.getMetodos();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Metodo no eliminado', '', 'info')
      }
    })

  }
}
