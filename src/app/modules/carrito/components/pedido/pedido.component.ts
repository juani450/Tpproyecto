import { Component } from '@angular/core';
import { Pedidos } from 'src/app/models/pedidos';
import { ServicioCarritoService } from '../../servicio-carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/servicio/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  productos : Pedidos[]=[]





  constructor(public servicioCarrito:ServicioCarritoService,
    public servicioAuth:AuthService
  ){}


  //Obtenemos el rol e ID del usuario para verificar que esta logueado correctamente
  ngOnInit(){
    this.servicioAuth.obtenerUid().then(uid => {
      if (uid) {
        this.servicioAuth.obtenerRol(uid).subscribe(rol => {
          if (rol === 'usuario'){

            //Inicializamos el carrito 
            this.servicioCarrito.iniciarCart();


            this.servicioCarrito.obtenerCarrito().subscribe(producto =>
              this.productos = producto
            );
          }
        })
      }
    })
  }


  

}
