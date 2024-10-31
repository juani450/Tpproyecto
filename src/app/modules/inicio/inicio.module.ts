import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CardInicioComponent } from './components/card-inicio/card-inicio.component';


@NgModule({
  declarations: [
    InicioComponent,
    CardInicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  
  ]
})
export class InicioModule { }
