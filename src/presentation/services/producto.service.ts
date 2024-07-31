import { Producto } from "../../data/postgres/models/producto.model"
import { CustomError } from "../../domain";
import {ProductoDto} from "../../domain/dtos/createProducto.dto"

export enum TipoProducto {
    TORTAS  = 'TORTAS',
    HELADOS= 'HELADOS',
    OTROS = 'OTROS'
    
  }

export class ProductoService {
    constructor(){}

    async createProducto(createProductoDto: ProductoDto) {
        const producto = new Producto();

        const productoPromise = await this.findOneProductByname(createProductoDto.nombreProducto);
        if (productoPromise) throw CustomError.badRequest("Name of product existing ... 🤷‍♂️")


        producto.nombreProducto = createProductoDto.nombreProducto;
        producto.tipoProducto = createProductoDto.tipoProducto;
        producto.precioVenta = createProductoDto.precioVenta;
        producto.precioCompra = createProductoDto.precioCompra;

    try {
        return await producto.save();
    } catch (error) {
        throw CustomError.internalServer("Something went wrong..😵‍💫")
    }
    }

    async findOneProduct(id:number) {
        const producto = await Producto.findOne({
            where: {
                id,
            },
        });
        if(!producto) throw CustomError.notFound("Producto not found");
        return producto;
    }

    async findOneProductByname(nombreProducto: string){

        const producto = await Producto.findOne({
            where: {
                nombreProducto,
            }
        })
        if(producto) throw CustomError.badRequest("This name is already existing");
        return producto


    }
}