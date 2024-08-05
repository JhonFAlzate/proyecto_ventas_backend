import { Inventario, Producto } from "../../data";
import { CustomError, ProductoDto } from "../../domain";
import { CreateInventarioDto } from "../../domain/dtos/inventarioProductos/createInventario-dto";
import { ProductoService } from "./producto.service";




export class InventarioService {
    constructor(
        public readonly productoService: ProductoService
    ){}


    async createInventario(createInventario: CreateInventarioDto){
        const inventario = new Inventario();

        const producto = await this.productoService.findOneProduct(createInventario.productoId)


        // if(!inventarioExisting) throw CustomError.notFound('Producto no encontrado')

        // const producto = await Producto.findOne({
        //     where:{
        //         id: createInventario.productoId,
        //     },
        // })

        // if(!producto) throw CustomError.notFound("Producto no existe");


        inventario.cantidadStock = createInventario.cantidadStock
        // inventario.productoId = producto
       console.log(producto)

        // try {
        //     return await inventario.save();
        // } catch (res) {
        //     throw CustomError.internalServer("Something went wrong")
        // }
    }

    async findInventarioProductoId(productoId: number){
        const producto = await Producto.findOne({
            where:{
                id: productoId,
            },
            relations: ["inventario"],
            select: {
                inventario: {
                    id: true
                }
            }
        })
        if(!producto) throw CustomError.notFound("Producto no encontrado");
        const inventario = producto.inventario;
        
        if(!inventario) throw CustomError.notFound("Producto no tiene inventario");
        return inventario
    }
}