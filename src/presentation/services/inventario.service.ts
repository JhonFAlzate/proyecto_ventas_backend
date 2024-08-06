import { Inventario, Producto } from "../../data";
import { CustomError, ProductoDto } from "../../domain";
import { CreateInventarioDto } from "../../domain/dtos/inventarioProductos/createInventario-dto";
import { ProductoService } from "./producto.service";




export class InventarioService {
    constructor(
        public readonly productoService: ProductoService
    ){}


    async createInventario(createInventarioDto: CreateInventarioDto){

     const producto = await this.productoService.findOneProduct(createInventarioDto.productoId)
     
     
     const productoExisteEnInventario = await this.findInventarioProductoId(createInventarioDto.productoId)
     
     if(productoExisteEnInventario) throw CustomError.badRequest("Este producto ya tiene un inventario")

     const inventario = new Inventario();

     inventario.cantidadStock = createInventarioDto.cantidadStock
     inventario.productoId = producto

     try {
        return await inventario.save();
     } catch (error) {
        throw CustomError.internalServer("Something went wrong")
     }
    }


    //Éste metodo tiene como finalidad revisar si el producto ya tiene un registro de inventario//
    async findInventarioProductoId(productoId: any){
        const productoEnInventario = await Inventario.findOne({
            where:{
                productoId: productoId
            },
            
        })     
       
        return productoEnInventario
    }




    async buscarInventarioById(id:number){
        const inventario = await Inventario.findOne({
            where:{
                id: id
            },
            relations: ['productoId'],
        });
        if(!inventario) throw CustomError.notFound(`inventario con id ${id} no encontrado`)

        return inventario
    }


    //ojo este metodo no está funcionando aún.....
    async deleteInventario(id:number) {
        const inventario = await this.findInventarioProductoId(id);
        console.log(inventario)
        inventario?.remove();
        try {
            await inventario?.save();
          } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 😵‍💫😵‍💫");
          }

    }

}