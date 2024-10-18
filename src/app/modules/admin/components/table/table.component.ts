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
  //CREAR COLECCION DE PRODUCTOS DEL TIPO PRODUCTOS -> LO DEFINIMOS CON UN ARRAY
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
                  title: 'Listoo!',
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

        this.limpiarInputs()
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
        Swal.fire({
          title: 'Listoo!',
          text: 'El producto se ha eliminado correctamente',
          icon: 'success',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido eliminar el producto',
          icon: 'error',
        });
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

    // Verificamos que el usuario ingrese una nueva imagen o no
    if (this.imagen) {
      this.servicioCrud
        .subirImagen(this.nombreImagen, this.imagen, 'productos')
        .then((resp) => {
          this.servicioCrud
            .ObtenerUrlImagen(resp)
            .then((url) => {
              // Actualizamos URL de la imagen en los datos del formulario
              datos.imagen = url;
              // Actualizamos los datos desde el formulario de edición
              this.actualizarProducto(datos);
              // Vaciamos casillas del formulario
              this.producto.reset();
            })
            .catch((error) => {
              alert('Hubo un problema al subir la imagen :( \n' + error);
              this.producto.reset();
            });
        });
    } else {
      /*
        Actualizamos formulario con los datos recibidos del usuario, pero sin modificar la
        imagen ya existente en Firestore y Storage
      */
      this.actualizarProducto(datos);
    }
  }

  //ACTUALIZA LA INFORMACION YA EXISTENTE DE LOS PRODUCTOS
  actualizarProducto(datos: Producto) {
    this.servicioCrud
      .modificarProducto(this.productoSeleccionado.IdProducto, datos)
      .then((producto) => {
        Swal.fire({
          title: 'Listoo!',
          text: 'El producto fue modiicado con exito',
          icon: 'success',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oh no!',
          text: 'Hubo un problema al modificar el producto',
          icon: 'error',
        });
      });
  }

  // Método para CARGAR IMÁGENES
  cargarImagen(event: any) {
    // Variable para obtener el archivo subido desde el input del HTML
    let archivo = event.target.files[0];
    // Variable para crear un nuevo objeto de tipo "archivo" o "file" y poder leerlo
    let reader = new FileReader();
    if (archivo != undefined) {
      /*
        Llamamos a método readAsDataUrl para leer toda la información recibida.
        Enviamos como parámetro el archivo porque será el encargado de tener la info. 
        ingresada por el usuario
      */
      reader.readAsDataURL(archivo);
      // Definimos qué haremos con la información mediante función flecha
      reader.onloadend = () => {
        let url = reader.result;
        // Verificamos que la URL sea existente y diferente a "nula"
        if (url != null) {
          // Definimos nombre de la imagen con atributo "name" del input
          this.nombreImagen = archivo.name;
          // Definimos ruta de la imagen según URL recibida en formato cadena (string)
          this.imagen = url.toString();
        }
      };
    }
  }

  // Función para vaciar el formulario
  limpiarInputs() {
    this.producto.setValue({
      nombre: '',
      precio: 0,
      descripcion: '',
      categoria: '',
      alt: '',
    });
  }
}
