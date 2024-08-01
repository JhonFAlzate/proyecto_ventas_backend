import { Request, Response } from "express";
import { SalesServices } from "../services/sale.service";
import { CustomError } from "../../domain";


export class SalesContoller{
    constructor(private readonly salesServices:SalesServices){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ message: error.message });
    
        return res.status(500).json({ message: "Something went very wrong! 🧨" });
      };

    createSale=(req:Request, res:Response)=>{
        // dto


        this.salesServices.create(req.body!)
            .then(sale=> res.status(202).json(sale))
            .catch(error=> this.handleError(error, res));
    };

    getAllSale=(_:Request, res:Response)=>{

    };

    getSaleById=(req:Request, res:Response)=>{

    };

    updateSale=(req:Request, res:Response)=>{
        // dto
    };

    deleteSale=(req: Request, res:Response)=>{

    };



};