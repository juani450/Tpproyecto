import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//IMPORTACIONES DE LAS VISTAS DEL MODULO PRODUCTO
import { ProductoComponent } from './page/producto/producto.component';
import { RemerasComponent } from './page/remeras/remeras.component';
import { BuzosComponent } from './page/buzos/buzos.component';
import { PantalonesComponent } from './page/pantalones/pantalones.component';
import { MediasComponent } from './page/medias/medias.component';

const routes: Routes = [

  {
    path:"producto",component:ProductoComponent
  },
  {
    path:"remeras",component:RemerasComponent
  },
  {
    path:"buzos",component:BuzosComponent
  },
  {
    path:"pantalones",component:PantalonesComponent
  },
  {
    path:"medias",component:MediasComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
