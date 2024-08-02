import { Clientes, Ventas } from "../../data";
import { CustomError, SalesCreateDto, SalesUpdateDto } from "../../domain";
import { ProductoService } from "./producto.service";
import { UsuarioService } from "./usuario.service";
import { Status } from "../../data/postgres/models/@types/usuarios.types";



export class SalesServices{
    constructor(
        private readonly usuarioService : UsuarioService,
        private readonly servicesProduct : ProductoService
    ){};

    async create(saleData:SalesCreateDto, id:number){

        const userPromise = this.usuarioService.obtenerPerfilDeUsuarioPorId(id);
        const productPromise = this.servicesProduct.findOneProduct(1);
        const clientPromise =  this.clientById(1);
        
        const [user, product, client] =  await Promise.all([userPromise, productPromise, clientPromise]);


        const sale =  new Ventas();

        sale.cantidad =  saleData.cantidad;
        sale.usuario =  user;
        sale.producto =  product;
        sale.cliente = client; 

        return await sale.save();

    };

    async getAll(){
        const sales = await Ventas.find({
            where: {
                status : Status.ACTIVO
            }
        });

        if(!sales) throw CustomError.notFound("Not found sale");

        return sales;
    };

    async getId(id:number){
        const sale = await Ventas.findOne({
            where : {id}
        });

        if(!sale) throw CustomError.notFound("Not found sale");

        return sale;
    };

    async update(saleData:SalesUpdateDto, id:number){
        const userPromise = this.usuarioService.obtenerPerfilDeUsuarioPorId(4);
        const productPromise = this.servicesProduct.findOneProduct(1);
        const clientPromise =  this.clientById(1);
        const salePromise =  this.getId(id);
        
        const [user, product, client, sale] =  await Promise.all([userPromise, productPromise, clientPromise, salePromise]);

        sale.cantidad =  saleData.cantidad;
        sale.usuario =  user;
        sale.producto =  product;
        sale.cliente = client; 

        return await sale.save() 
    };

    async delete(id:number){
        const sale = await this.getId(id);

        sale.status = Status.INACTIVO;

        return await sale.save();
    };

    async clientById(id:number){
        const client = await Clientes.findOne({
            where : {id}
        });

        if(!client) throw CustomError.notFound("Not found client");
        return client;
    };

};