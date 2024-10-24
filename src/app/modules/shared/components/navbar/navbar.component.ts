import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/autentificacion/servicio/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  logueado = true;
  deslogueado = false


  constructor(public servicioAuth:AuthService, public servicioRutas:Router){}

  iniciar(){
    this.logueado = false;
    this.deslogueado= true;
  }


  cerrarSesion(){
    this.deslogueado = false;


    this.servicioAuth.cerrarSesion();
    this.servicioRutas.navigate(['/']);
    this.logueado = true
  }



  //Funcion Para Modo Oscuro
  cambiarFondo(){
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
    let label_toggle:HTMLElement | null = document.getElementById('label_toggle') as HTMLElement
    if(toggle){
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark',checked)
      if(checked){
        label_toggle!.innerHTML ='<i class="fa-solid fa-sun"></i>';
      }else{
        label_toggle!.innerHTML ='<i class="fa-solid fa-moon"></i>'
      }
    }
  }


}
