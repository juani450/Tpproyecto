import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {

  coleccionProductos: Producto[] = [];

  //Variable para trabajar el estado de edicion y eliminacion de productos
  modalVisibleProducto: boolean = false;

  //variable va a tomar el producto que nosotros elijamos
  productoSeleccionado!: Producto; // <- recibe valores vacios

  nombreImagen!: string; //Obtendra el nombre de la imagen

  imagen!: string; //obtendra la ruta de la imagen

  //DEFINIMOS FORMULARIO PARA LOS PRODUCTOS

  /*
   * ATRIBUTOS ALFANUMERICOS (string) SE INICIALIZA CON COMILLAS SIMPLE
   * ATRIBUTOS NUMERICOS (number) SE INICIALIZA CON CERO ('0')
   */

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    //imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
  });

  constructor(public servicioCrud: CrudService) {}

  ngOnInit(): void {
    //subscribe = notifica constantemente los cambios actuales del sistema
    this.servicioCrud.obtenerProducto().subscribe((producto) => {
      //guarda la informacion recibida como un nuevo "producto" a la coleccion
      this.coleccionProductos = producto;
    });
  }

  async agregarProducto() {
    //Validamos los valores del producto agregado
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        //idProducto no se toma porque es generadapor la BD y no por el usuario
        IdProducto: '',
        //El resto es tomado con informacion ingresada por el usuario
        nombre: this.producto.value.nombre!,
        descripcion: this.producto.value.descripcion!,
        precio: this.producto.value.precio!,
        categoria: this.producto.value.categoria!,
        //imagen ahora toma la URL generada desde storage
        imagen: '',
        alt: this.producto.value.alt!,
      };

      //Enviamos nombre y url de la imagen ; definimos carpeta de imagenes como "producto"
      await this.servicioCrud
        .subirImagen(this.nombreImagen, this.imagen, 'productos')
        .then((resp) => {
          //encapsulamos formulario y enviamos la informacion obtenida
          this.servicioCrud.ObtenerUrlImagen(resp).then((url) => {
            //

            this.servicioCrud
              .crearProducto(nuevoProducto, url)
              .then((producto) => {
                Swal.fire({
                  title: 'Sos un capo!',
                  text: 'El producto ha sido agregado correctamente!',
                  icon: 'success',
                });
              })
              .catch((error) => {
                Swal.fire({
                  title: 'error!',
                  text: 'Hubo un problema al agregar el producto!',
                  icon: 'error',
                });
              });
          });
        });
    }
  }

  //funcion para aertar al usuario del producto que desea eliminar
  mostrarBorrar(productoSeleccionado: Producto) {
    //Abre el modal
    this.modalVisibleProducto = true;
    //toma los valores del producto elegido
    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud
      .eliminarProducto(
        this.productoSeleccionado.IdProducto,
        this.productoSeleccionado.imagen
      )
      .then((respuesta) => {
        alert('El producto se ha eliminado correctamente!');
      })
      .catch((error) => {
        alert('No se ha podido eliminar el producto \n' + error);
      });
  }

  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado;

    //Enviar o "setear" los nuevos valores y reasignarlos a las variables
    //El ID no se vuelve a enviar ni se modifica, por ende no lo llamamos
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      //imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt,
    });
  }

  editarProducto() {
    let datos: Producto = {
      //Solo el ID toma y deja igual su valor
      IdProducto: this.productoSeleccionado.IdProducto,
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      //
      imagen: this.productoSeleccionado.imagen,
      alt: this.producto.value.alt!,
    };

    //actualizarProducto(){}

    this.servicioCrud
      .modificarProducto(this.productoSeleccionado.IdProducto, datos)
      .then((producto) => {
        alert('El producto fue modificado con èxito');
      })
      .catch((error) => {
        alert('Hubo un problema al modificar el producto');
      });
  }
}
