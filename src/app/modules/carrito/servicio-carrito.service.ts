import { Injectable } from '@angular/core';
import { CrudService } from '../admin/services/crud.service';
import { AuthService } from '../autentificacion/servicio/auth.service';
import { FirestoreService } from '../shared/service/firestore.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Pedidos } from 'src/app/models/pedidos';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicioCarritoService {

  pedido:Pedidos = {
    idPedido:'',
    producto:{
      IdProducto:'',
      nombre:'',
      precio:0,
      descripcion:'',
      categoria:'',
      imagen:'',
      alt:''
    },

    cantidad:0,
    total:0
  }







  private pedidoCollection : AngularFirestoreCollection<pedido>

  private uid: string | null = null;




  constructor(
    private servicioCrud: CrudService,
    private servicioAuth: AuthService,
    private servicioFirestore:FirestoreService
  ) {

    //Creamos una subcoleccion dentro de la coleccion de usuario y le damos ese valor a pedidocollection

    this.pedidoCollection = this.servicioFirestore.coleccion{`usuarios/$(this.uid)/pedido`}
   }



   //Funcion para inicializar el carrito
   iniciarCart(){
    this.servicioAuth.obtenerUid().then(uid => {
      //Obtenemmos el ID del usuario para la subcoleccion
      this.uid = uid;
      if(this.uid){
        console.log(this.uid);
      }else{
        console.error("No se obtuvo el UID")
      }
    })
   }



   obtenerCarrito(){
    return this.pedidocollection.snapshotChanges().pipe(map(action=>action.map(a => a.payload.doc.data())))
   }



   crearPedido(producto: Producto, stock:number){
    try{
      //Creamos un ID para el pedido que sera subido
      const idPedido = this.servicioFirestore.createId();



      //Reemplazamos los valores de pedido por los valores que detallamos
      this.pedido.idPedido = idPedido
      this.pedido.producto = producto;
      this.pedido.cantidad = stock;
      this.pedido.total = producto.precio*stock

      this.pedidoCollection.doc(idPedido).set(this.pedido)

    }catch{
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al subir su producto',
        icon:'error'
      })

    }

  }

}
