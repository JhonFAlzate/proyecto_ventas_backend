



import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { InventarioService } from "../services/inventario.service";
import { CreateInventarioDto } from "../../domain/dtos/inventarioProductos/createInventario-dto";


export class InventarioController {

    constructor(
        private readonly serviceInventario: InventarioService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({message: error.message})
        }

        console.log(error)
        return res.status(500).json({message: 'Something went very wrong 🧨🧨🧨'})
    }

    crearInventario = (req: Request, res: Response) => {
        const [error, createInventarioDto] = CreateInventarioDto.create(req.body)

        if(error) return res.status(422).json({message: error});
        this.serviceInventario.createInventario(createInventarioDto!)

        .then((repair) => res.status(200).json(repair))
        .catch((error: unknown) => this.handleError(error, res));

    }
}