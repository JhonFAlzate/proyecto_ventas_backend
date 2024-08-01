import { Ventas } from "../../data";
import { CustomError, SalesCreateDto, SalesUpdateDto } from "../../domain";
import { ProductoService } from "./producto.service";
import { UsuarioService } from "./usuario.service";
import { Status } from "../../data/postgres/models/@types/usuarios.types";



export class SalesServices{
    constructor(
        private readonly usuarioService : UsuarioService,
        private readonly servicesProduct : ProductoService
    ){};

    async create(saleData:SalesCreateDto){
        // falta el cliente poder ver si el cliente existe;
        const userPromise = this.usuarioService.obtenerPerfilDeUsuarioPorId(1);
        const productPromise = this.servicesProduct.findOneProduct(1);


        const [user, product] =  await Promise.all([userPromise, productPromise]);

        const sale =  new Ventas();

        sale.cantidad =  saleData.cantidad;
        sale.usuario =  user;
        sale.producto =  product;


        return await sale.save();

    };

    async getAll(){
        const sales =  Ventas.findOne({
            where: {
                status : Status.ACTIVO
            }
        });

        if(!sales) throw CustomError.notFound("Not found sale");
    };

    async getId(id:number){
        const sale = await Ventas.findOne({
            where : {id}
        });

        if(!sale) throw CustomError.notFound("Not found sale");

        return sale;
    };

    async update(saleData:SalesUpdateDto, id:number){
         // falta el cliente poder ver si el cliente existe;
        const userPromise = this.usuarioService.obtenerPerfilDeUsuarioPorId(id);
        const productPromise = this.servicesProduct.findOneProduct(1);


        const [user, product] =  await Promise.all([userPromise, productPromise]);

        const sale =  new Ventas();

        sale.cantidad =  saleData.cantidad;
        sale.usuario =  user;
        sale.producto =  product;


        return await sale.save();
    };

    async delete(id:number){
        await this.getId(id);
        const sale =  new Ventas();

        sale.status = Status.INACTIVO;

        return await sale.save();
    };


};