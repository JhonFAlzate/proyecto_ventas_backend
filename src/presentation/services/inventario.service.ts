import { MoreThan } from "typeorm";
import { Inventario } from "../../data";
import { CustomError } from "../../domain";
import { CreateInventarioDto } from "../../domain/dtos/inventarioProductos/createInventario-dto";
import { ProductoService, TipoProducto } from "./producto.service";

export class InventarioService {
    constructor(
        public readonly productoService: ProductoService
    ){};

    async createInventario(createInventarioDto: CreateInventarioDto){
        const productoPromise =  this.productoService.findOneProduct(createInventarioDto.productoId);
        
        const inventarioPromise =  this.inventoryOneId(createInventarioDto.productoId);

        const [producto, inventario] =  await Promise.all([productoPromise, inventarioPromise]);

        if (inventario) throw CustomError.badRequest("Ya esxiste en el inventario");


        const nuevoInventario = new Inventario();
        nuevoInventario.cantidadStock = createInventarioDto.cantidadStock;
        nuevoInventario.productoId = producto;
        await nuevoInventario.save();

        return nuevoInventario;
    };

    async getAllInventori(){
        const inventario =  await Inventario.find({
            where : {cantidadStock : MoreThan(0) }
        });

        if(!inventario) throw CustomError.notFound("no existe el inventario");

        return inventario;
    };

    async buscarInventarioById(id:number){
        const inventario = await Inventario.findOne({
            where: {id},
            relations: ['productoId']
        });

        if(!inventario) throw CustomError.notFound("no existe el inventario");

        return inventario;
    };

    async updateInventori(id:number, createInventarioDto: CreateInventarioDto ){

        const productoPromise =  this.productoService.findOneProduct(createInventarioDto.productoId);
        
        const inventarioPromise =  this.buscarInventarioById(id);

        const [producto, inventario] =  await Promise.all([productoPromise, inventarioPromise]);


        inventario.cantidadStock = createInventarioDto.cantidadStock;
        inventario.productoId = producto
        await inventario.save();

        return inventario;


    };

    async deleteInventario(id:number){
        const inventario = await this.buscarInventarioById(id);
        inventario?.remove();
        try {
            await inventario?.save();
          } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 😵‍💫😵‍💫");
          }
    }

    async inventoryOneId(productoId:number){
        const inventario = await Inventario.findOne({
            where: { productoId: { id: productoId } },
            relations: ['productoId']
        });

        return inventario
    };





};
