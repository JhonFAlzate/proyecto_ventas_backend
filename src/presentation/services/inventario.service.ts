import { Inventario } from "../../data";
import { CustomError } from "../../domain";
import { CreateInventarioDto } from "../../domain/dtos/inventarioProductos/createInventario-dto";
import { ProductoService } from "./producto.service";

export class InventarioService {
    constructor(
        public readonly productoService: ProductoService
    ){};

    async createInventario(createInventarioDto: CreateInventarioDto){
        const productoPromise =  this.productoService.findOneProduct(createInventarioDto.productoId);
        
        const inventarioPromise =  this.inventoryFindOneId(createInventarioDto.productoId);

        const [producto, inventario] =  await Promise.all([productoPromise, inventarioPromise]);

        if (inventario) throw CustomError.badRequest("Ya esxiste en el inventario");


        const nuevoInventario = new Inventario();
        nuevoInventario.cantidadStock = createInventarioDto.cantidadStock;
        nuevoInventario.productoId = producto;
        await nuevoInventario.save();

        return nuevoInventario;
    };


    async deleteInventario(id:number){

    };

    async inventoryFindOneId(productoId:number){
        const inventario = await Inventario.findOne({
            where: { productoId: { id: productoId } },
            relations: ['productoId']
        });

        return inventario
    };

    async buscarInventarioById(id:number){

    };


};
