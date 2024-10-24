import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card-medias',
  templateUrl: './card-medias.component.html',
  styleUrls: ['./card-medias.component.css']
})
export class CardMediasComponent {

  // Colección de todos los productos
  coleccionProductos: Producto[] = [];
  // Colección de sólo productos de categoría "Juguetes"
  coleccionMedias: Producto[] = [];
  productoSeleccionado!: Producto;
  modalVisible: boolean = false;
  constructor(public servicioCrud: CrudService){}
  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

      // mostrar la colección actual de juguetes
     this.mostrarProductoMedias();
    })
    // mostrar la colección actual de juguetes
  }
  // Función para filtrar los productos que sean del tipo "juguetes"
  mostrarProductoMedias(){
    // forEach: itera la colección
    this.coleccionProductos.forEach(producto => {
      // Si la categoría del producto es igual a "juguetes", se enviará a la 
      // colección de juguetes específicada
      if(producto.categoria ==="medias"){
        // .push: sube o agrega un item a una colección
        this.coleccionMedias.push(producto);
      }
    })
  }
  // Muestra información completa de un producto elegido por el usuario
  mostrarVer(info: Producto){
    this.modalVisible = true;
    this.productoSeleccionado = info;
  }

}
