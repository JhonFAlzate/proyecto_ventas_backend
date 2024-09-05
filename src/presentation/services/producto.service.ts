import { Producto } from "../../data/postgres/models/producto.model";
import { CustomError } from "../../domain";
import { ProductoDto } from "../../domain/dtos/productos/createProducto.dto";

export enum TipoProducto {
  TORTAS = "TORTAS",
  HELADOS = "HELADOS",
  OTROS = "OTROS",
}

export class ProductoService {
  constructor() {}

  async createProducto(createProductoDto: ProductoDto) {
    
    const productoPromise = await this.findOneProductByname(createProductoDto.nombreProducto);
    if (productoPromise) throw CustomError.badRequest("Name of product existing ... 🤷‍♂️");
    
    const producto = new Producto();
    producto.nombreProducto = createProductoDto.nombreProducto.toLocaleLowerCase().trim();
    producto.tipoProducto = createProductoDto.tipoProducto.toLocaleUpperCase().trim();
    producto.precioVenta = createProductoDto.precioVenta;
    producto.precioCompra = createProductoDto.precioCompra;


    try {
      return await producto.save();
    } catch (error) {
      console.log(error)
      throw CustomError.internalServer("Something went wrong..😵‍💫 ");
    }
  }

  async findOneProduct(id: number) {
    const producto = await Producto.findOne({
      where: {
        id,
      },
      select:{
        id: true,
        nombreProducto: true
      },
      relations : ['inventario']
    });
    if (!producto) throw CustomError.notFound("Producto not found");
    return producto;
  }



  async findOneProductByname(nombreProducto: string) {
    const producto = await Producto.findOne({
      where: {
        nombreProducto: nombreProducto.toLocaleLowerCase(),
      },
    });
    if (producto) throw CustomError.badRequest("This name is already existing");
    return producto;
  }


  async findAllProductos() {
    const producto = await Producto.find();
    return producto;
  }


  async updateProductos(productoDto: ProductoDto, id: number) {
    const producto = await this.findOneProduct(id);

    if (!producto)
      throw CustomError.notFound(`Producto con id ${id} no existe`);

    producto.nombreProducto = productoDto.nombreProducto;
    producto.tipoProducto = productoDto.tipoProducto;
    producto.precioVenta = productoDto.precioVenta;
    producto.precioCompra = productoDto.precioCompra;

    try {
      return await producto.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 😵‍💫😵‍💫");
    }
  }

  async deleteProducto(id: number) {
    const producto = await this.findOneProduct(id);

    console.log(producto);
    // await producto.remove();

    
    try {
      // await producto.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 😵‍💫😵‍💫");
    }
  }
}
