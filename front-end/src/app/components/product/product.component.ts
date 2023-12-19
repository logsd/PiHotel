import { Component , OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  addProduct(form: NgForm){
    if(form.value._id){
      this.productService.putProduct(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto Actualizada Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getProducts()

        })
    } else {
      this.productService.postProduct(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getProducts()
      },
      error : (e:HttpErrorResponse)=>{
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El producto ya existe!',

        })
      }
      })
    }
  }



  getProducts(){
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.products =res as Product[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.productService.selectedProduct = new Product();
    }
  }

  editProduct(product: Product){
    this.productService.selectedProduct = product;
  }

  deleteProduct(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar este Procuto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productService.deleteProduct(_id)
      .subscribe(res =>{
        this.getProducts();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Producto no eliminado', '', 'info')
      }
    })

  }
}
