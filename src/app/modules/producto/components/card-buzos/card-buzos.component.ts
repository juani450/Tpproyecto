import { Component } from '@angular/core';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-card-buzos',
  templateUrl: './card-buzos.component.html',
  styleUrls: ['./card-buzos.component.css']
})
export class CardBuzosComponent {

   // Colección de todos los productos
   coleccionProductos: Producto[] = [];
   // Colección de sólo productos de categoría "Juguetes"
   coleccionBuzos: Producto[] = [];
   productoSeleccionado!: Producto;
   modalVisible: boolean = false;
   constructor(public servicioCrud: CrudService){}
   ngOnInit(): void{
     this.servicioCrud.obtenerProducto().subscribe(producto => {
       this.coleccionProductos = producto;

       // mostrar la colección actual de juguetes
      this.mostrarProductoBuzos();
     })
     // mostrar la colección actual de juguetes
   }
   // Función para filtrar los productos que sean del tipo "juguetes"
   mostrarProductoBuzos(){
     // forEach: itera la colección
     this.coleccionProductos.forEach(producto => {
       // Si la categoría del producto es igual a "juguetes", se enviará a la 
       // colección de juguetes específicada
       if(producto.categoria === "buzos"){
         // .push: sube o agrega un item a una colección
         this.coleccionBuzos.push(producto);
       }
     })
   }
   // Muestra información completa de un producto elegido por el usuario
   mostrarVer(info: Producto){
     this.modalVisible = true;
     this.productoSeleccionado = info;
   }

}
