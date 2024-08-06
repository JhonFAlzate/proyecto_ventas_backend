


import { Request, Response } from "express";
import { CustomError, ProductoDto } from "../../domain";
import { ProductoService } from "../services/producto.service";
import { UpdateProductosDto } from "../../domain/dtos/productos/update-producto.dto";


export class ProductosController {

    constructor(
        private readonly productoService: ProductoService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({message: error.message})
        }

        console.log(error)
        return res.status(500).json({message: 'Something went very wrong 🧨🧨'})
    }

    createProducto = (req: Request, res: Response) => {
        const [error, createProductoDto] = ProductoDto.createProductoDto(req.body);

        if(error) return res.status(422).json({message:error});

        this.productoService.createProducto(createProductoDto!)
        .then((producto) => res.status(201).json(producto))
        .catch((error: unknown) => {

            return this.handleError(error, res);
        })

       
    }

    getAllProductos = async (req: Request, res: Response) => {
        this.productoService.findAllProductos()
        .then((producto) => res.status(200).json(producto))
        .catch((error: unknown) => this.handleError(error, res))
    }

    getOneProducto = async (req: Request, res: Response) => {
        const {id} = req.params;
        if (isNaN(+id)) {
            return res.status(400).json({ message: "El id debe ser un número" });
          }

        this.productoService.findOneProduct(+id)
        .then((producto) => res.status(200).json(producto))
        .catch((error: unknown) => this.handleError(error, res))
    }

    updateProductos = (req: Request, res: Response) => {
        const {id} = req.params;
        const [error, updateProductosDto] = UpdateProductosDto.updateProducto(req.body);
        if(isNaN(+id)){
            return res.status(400).json({message: "El id debe ser un número"});
        }
        if (error) return res.status(422).json({message: error});

        this.productoService.updateProductos(updateProductosDto!, +id)
        .then((producto) => res.status(200).json(producto))
        .catch((error: unknown) => this.handleError(error, res))
    }

    deleteProductoById = (req: Request, res: Response) => {
        const {id} = req.params;

        if(isNaN(+id)){
            return res.status(400).json({message: "El id debe ser un número"})
        }
        this.productoService.deleteProducto(+id)

        .then((producto) => res.status(204).json(producto))
        .catch((error: unknown) => this.handleError(error, res))
    }

}