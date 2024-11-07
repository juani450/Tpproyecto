import { Producto } from "./producto";

export interface Pedidos {


    idPedido:string,
    producto:Producto,
    cantidad:number,
    total:number


}
