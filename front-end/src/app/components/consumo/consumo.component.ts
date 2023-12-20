import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReservaService } from 'src/app/services/reserva.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Consumo } from 'src/app/models/consumo';
import { ConsumoService } from 'src/app/services/consumo.service';
import { Reserva } from 'src/app/models/reserva';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css'],
  providers: [ConsumoService, ReservaService, ProductService]
})
export class ConsumoComponent implements OnInit {
  constructor(public consumoService: ConsumoService, public reservaService: ReservaService, public productService: ProductService) { }


  consumo = new Consumo();
  ngOnInit(): void {
    this.getConsumos()
    this.getProducts()
    this.getReservas()
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
      this.consumo.reserva = form.value.reserva;
      this.consumo.producto = form.value.producto;
      this.consumo.cantidad = form.value.cantidad;
      this.consumo.precioVenta  = form.value.precioVenta;
      this.consumo.estado = form.value.estado;
      this.consumoService
      .postConsumo(this.consumo)
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

  getReservas(){
    this.reservaService.getReservas()
      .subscribe(res => {
        this.reservaService.reservas =res as Reserva[];
      });
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.products =res as Product[];
      });
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

  editConsumo(consumo: Consumo){
    this.consumoService.selectedConsumo = consumo;
  }

  deleteConsumo(_id:any){
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
