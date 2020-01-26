import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
// import { setTimeout } from 'timers';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // Bandera de carga
  cargando = true;
  productos: ProductoInterface[] = [];

  productosFiltrado: ProductoInterface[] = []

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) =>{

      this.http.get('https://db-angular-9f426.firebaseio.com/productos_idx.json')
        .subscribe((resp: ProductoInterface[]) => {
          // console.log(resp);
          this.productos = resp;
          // setTimeout(() => {
          this.cargando = false;
          // }, 3000);
          resolve();
        });

    } );

  }

  getProducto(id: string) {
    return this.http.get(`https://db-angular-9f426.firebaseio.com/productos/${id}.json`);
  }

  buscarProdcuto(termino: string) {

    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () =>{
        // ejecutar después de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      } );
    } else {
      // aplicar filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }
    });
  }
}
