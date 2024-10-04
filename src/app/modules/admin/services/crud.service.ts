import { importProvidersFrom, Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ProductoComponent } from '../../producto/page/producto/producto.component';
import { map } from 'rxjs';
import { getStorage, getDownloadURL, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';



/*
getDownloadURL => Para obtener la URL de descarga de la imagen subida
getStorage => Para obtener la instancia de almacenamiento
ref => Para crear referencias a ubicaciones en el almacenamiento
UploadResult=> Tipo que representa el resultado de una operacion suv}bida
UploadString => Para subir imagenes en formato de una cadena (string)
DeleteObject => Para eliminar un espacio en el almacenamiento
*/


@Injectable({
  providedIn: 'root'
})
export class CrudService {



  //DEFINIMOS COLECCION PARA LOS PRODUCTOS Y SERA SUBIDA COMO "PRODUCTO" A FIRESTORE

  private productosCollection: AngularFirestoreCollection<Producto>;

  //Definimos variable "respuesta" que podra subir resultados
  private respuesta!: UploadResult;

  //Inicializamos servicio de storage
  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
  }

  //CREAR PRODUCTO => obtiene datos del formulario y url de la imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //CREAMOS NUMERO IDENTIFICATIVO PARTA EL PRODUCTO EN LA BASE DE DATOS
        const IdProducto = this.database.createId();

        //ASIGNAMOS ID CREADO AL ATRIBUTO IDPRODUCTO DE LA INTERFAZ "PRODUCTO"
        producto.IdProducto = IdProducto;

        //Asignamos URL  recibida del parametro al atributo imagen de la interfaz Producto
        producto.imagen = url;

        const resultado = await this.productosCollection
          .doc(IdProducto)
          .set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    });
  }

  //OBTENER PRODUCTO

  obtenerProducto() {
    //snapshotChange -> toma na captura del estado de los datos
    //pipe -> funciona como una tuberia que retoma el nuevo arreglo de datos
    //map -> "mapea" o recorre esa nueva informacion
    //a -> resguarda la nueva informacion y la envia

    return this.productosCollection
      .snapshotChanges()
      .pipe(map((action) => action.map((a) => a.payload.doc.data())));
  }

  //EDITAR PRODUCTO

  modificarProducto(idProducto: string, nuevoData: Producto) {
    //accedemos a la coleccion, buscamos por ID y actualizamos informacion
    return this.database
      .collection('producto')
      .doc(idProducto)
      .update(nuevoData);
  }

  //ELIMINAR PRODUCTO
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        //Definimos referencia local de Storage en el bloque "try"
        const storage = getStorage();

        //Ddefinimos referencia local desde el almacenamiento de storage
        const referenciaImagen = ref(storage, imagenUrl);

        //Eliminamos la imagen desde el almacenamiento
        deleteObject(referenciaImagen)
          .then((res) => {
            //accede a la coleccion, busco su ID y lo elimino
            const respuesta = this.productosCollection.doc(idProducto).delete();
            resolve(respuesta);
          })
          .catch((error) => {
            reject('Error al eliminar la imagen: \n' + error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  //Obrtener url de las imagenes
  ObtenerUrlImagen(respuesta: UploadResult) {
    //Retorna URL obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }

  /**
   * PARAMETROS DEFINIDOS
   * @param {string} nombre <- nombre de la imagen
   * @param {any} imagen <- tipo de imagenes que se pueden subir (extension)
   * @param {string} ruta <- ruta de almacenamiento de las imagenes
   * @returns <- se retorna lo obtenido
   */

  //SUBIR imagenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    //Accede al storage(almacenamiento) , ruta (carpeta) / nombre (nombre imagen)
    try {
      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      //asignamos a la respuesta la informacion de la imagen subida
      this.respuesta = await uploadString(
        referenciaImagen,
        imagen,
        'data_url'
      ).then((resp) => {
        return resp;
      });
      return this.respuesta;
    } catch (error) {
      console.log('Error: \n' + error);

      return this.respuesta;
    }
  }





}
