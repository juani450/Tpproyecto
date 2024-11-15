import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicio/auth.service';
import { FirestoreService } from '../../shared/service/firestore.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  hide = true;

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router,
    public servicioCarrito: CarritoService
  ) {}

  // ####################################### INGRESADO
  // Importamos la interfaz de usuario e inicializamos vacío
  usuarioIngresado: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
  };

  // Función para el inicio de sesión
  async iniciarSesion() {
    const credenciales = {
      email: this.usuarioIngresado.email,
      password: this.usuarioIngresado.password,
    }


    try{
      // Obtenemos el usuario desde la BD -> Cloud Firestore
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      // ! -> si es diferente
      // .empy -> método de Firebase para marcar si algo es vacío
      if(!usuarioBD || usuarioBD.empty){
        Swal.fire({
          text: "Correo electrónico no registrado",
          icon: "error"
        })
        this.limpiarInputs();
        return;
      }

      /* Primer documento (registro) en la colección de usuarios que se obtiene desde la 
        consulta.
      */
    const usuarioDoc = usuarioBD.docs[0];

    /**
       * Extrae los datos del documento en forma de un objeto y se específica como de tipo 
       * "Usuario" -> haciendo referencia a nuestra interfaz de Usuario.
       */
    const usuarioData = usuarioDoc.data() as Usuario;

    // Hash de la contraseña ingresada por el usuario
    const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

    if(hashedPassword !== usuarioData.password){
        Swal.fire({
          text: "Contraseña incorrecta",
          icon: "error"
        })

        this.usuarioIngresado.password = '';
        return;
    }








    const res = await this.servicioAuth
    .iniciarSesion(credenciales.email, credenciales.password)
    .then((res) => {
        
        Swal.fire({
          title: "Ya estas dentro!",
          text: "Se pudo iniciar sesion con exito!",
          icon: "success"
        });
        


        // Almacena el rol del usuario en el servicio de autentificación
        this.servicioAuth.enviarRolUsuario(usuarioData.rol);
        if(usuarioData.rol === "admin"){
          console.log("Inicio de sesión de usuario administrador")
          // Si es administrador, redirecciona a la vista de 'admin'
          this.servicioRutas.navigate(['/admin']);
        } else {
          console.log("Inicio de sesión de usuario visitante");
          // Si es visitante, redirecciona a la vista de 'inicio'
          this.servicioRutas.navigate(['/inicio']);


          this.servicioCarrito.iniciarCart();

        }




    })
    .catch((err) => {


        Swal.fire({
          title: "Oh no !",
          text: "Hubo un problema al iniciar sesión  :( " + err,
          icon: "error"
        });

        this.limpiarInputs();
    });
  }catch(error){
    this.limpiarInputs();
  }
  }
  // Función para vaciar el formulario
  limpiarInputs() {
    const inputs = {
      email: this.usuarioIngresado.email = '',
      password: this.usuarioIngresado.password = ''
    }
  }
}

