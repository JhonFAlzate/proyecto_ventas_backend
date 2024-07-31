


import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class ProductosController {

    constructor(
        //Dependency injection
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({message: error.message})
        }

        console.log(error)
        return res.status(500).json({message: 'Something went very wrong 🧨🧨🧨'})
    }

    createProducto = (req: Request, res: Response) => {
        //implementar el metodo
        return res.status(200).json({ message: 'Hello World'})
    }
}