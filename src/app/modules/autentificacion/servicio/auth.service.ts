import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {}


  // Función para REGISTRO
  registrar(email: string, password: string){
    // Retorna nueva información de EMAIL y CONTRASEÑA
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Función para INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // Validar el email y la contraseña
    return this.auth.signInWithEmailAndPassword(email, password);
  }





  cerrarSesion() {
    return this.auth.signOut();
  }
}
