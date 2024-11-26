import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../../models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { CarritoService } from 'src/app/modules/carrito/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  // Definimos colección local de productos
  coleccionProductos: Producto[] = [];
  // Variable local para obtener producto seleccionado
  productoSeleccionado!: Producto;
  // Variable para manejar estado de un modal
  modalVisible: boolean = false;

  //Booleano para manejar la visibilidad de "Ultima Compra"
  compraVisible:boolean = false;



  
  constructor(
    public servicioCrud: CrudService,
    public servicioCarrito: CarritoService
  ){}

  
  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }
  // Función para modal que muestre la información de un producto en específico
  mostrarVer(info: Producto){
    // Habilita visibilidad del modal
    this.modalVisible = true;
    // Guarda información de un producto elegido por el usuario
    this.productoSeleccionado = info;
  }



  





  


}
