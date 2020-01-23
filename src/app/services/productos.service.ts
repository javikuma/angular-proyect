import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { setTimeout } from 'timers';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // Bandera de carga
  cargando = true;
  productos: ProductoInterface[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
   }

   private cargarProductos(){
      this.http.get('https://db-angular-9f426.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductoInterface[]) =>{
          console.log(resp);
          this.productos = resp;

          // setTimeout(() => {
            this.cargando = false;
          // }, 3000);
        });
   }
}
