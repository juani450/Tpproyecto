import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductoRoutingModule } from './producto-routing.module';
//VISTAS PRODUCTOS
import { RemerasComponent } from './page/remeras/remeras.component';
import { BuzosComponent } from './page/buzos/buzos.component';
import { PantalonesComponent } from './page/pantalones/pantalones.component';
import { MediasComponent } from './page/medias/medias.component';
import { ProductoComponent } from './page/producto/producto.component';
import { CardBuzosComponent } from './components/card-buzos/card-buzos.component';
import { CardRemerasComponent } from './components/card-remeras/card-remeras.component';
import { CardPantalonesComponent } from './components/card-pantalones/card-pantalones.component';
import { CardMediasComponent } from './components/card-medias/card-medias.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    RemerasComponent,
    BuzosComponent,
    PantalonesComponent,
    MediasComponent,
    ProductoComponent,
    CardBuzosComponent,
    CardRemerasComponent,
    CardPantalonesComponent,
    CardMediasComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RemerasComponent,
    BuzosComponent,
    PantalonesComponent,
    MediasComponent,
    ProductoComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
