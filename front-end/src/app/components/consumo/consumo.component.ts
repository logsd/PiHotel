import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Consumo } from 'src/app/models/consumo';
import { ConsumoService } from 'src/app/services/consumo.service';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css'],
  providers: [ConsumoService]
})
export class ConsumoComponent implements OnInit {
  constructor(public consumoService: ConsumoService) { }

  ngOnInit(): void {
    this.getConsumos()
  }

  addConsumo(form: NgForm){
    if(form.value._id){
      this.consumoService.putConsumo(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Consumo Actualizada Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getConsumos()

        })
    } else {
      this.consumoService.postConsumo(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Consumo creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getConsumos()
      },
      error : (e:HttpErrorResponse)=>{
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El consumo ya existe!',

        })
      }
      })
    }
  }



  getConsumos(){
    this.consumoService.getConsumos()
      .subscribe(res => {
        this.consumoService.consumos =res as Consumo[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.consumoService.selectedConsumo = new Consumo();
    }
  }

  editProduct(consumo: Consumo){
    this.consumoService.selectedConsumo = consumo;
  }

  deleteProduct(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar este Consumo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.consumoService.deleteConsumo(_id)
      .subscribe(res =>{
        this.getConsumos();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Consumo no eliminado', '', 'info')
      }
    })

  }
}
