import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
//VISTAS PRODUCTOS
import { RemerasComponent } from './page/remeras/remeras.component';
import { BuzosComponent } from './page/buzos/buzos.component';
import { PantalonesComponent } from './page/pantalones/pantalones.component';
import { MediasComponent } from './page/medias/medias.component';
import { ProductoComponent } from './page/producto/producto.component';


@NgModule({
  declarations: [
    RemerasComponent,
    BuzosComponent,
    PantalonesComponent,
    MediasComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports: [
    RemerasComponent,
    BuzosComponent,
    PantalonesComponent,
    MediasComponent,
    ProductoComponent
  ]
})
export class ProductoModule { }
