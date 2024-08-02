import { Request, Response } from "express";
import { SalesServices } from "../services/sale.service";
import { CustomError, SalesCreateDto, SalesUpdateDto } from "../../domain";


export class SalesContoller{
    constructor(private readonly salesServices:SalesServices){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) return res.status(error.statusCode).json({ message: error.message });
    
        return res.status(500).json({ message: "Something went very wrong! 🧨" });
      };

    createSale=(req:Request, res:Response)=>{
        const {id} = req.body.userSession;

        const [error, salesData] = SalesCreateDto.create(req.body);

        if(error) return res.status(422).json(error);

        this.salesServices.create(salesData!, id)
            .then(sale=> res.status(202).json(sale))
            .catch(error=> this.handleError(error, res));
    };

    getAllSale=(_:Request, res:Response)=>{
        this.salesServices.getAll()
            .then(sales=> res.status(200).json(sales))
            .catch(error => this.handleError(error, res));
    };

    getSaleById=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message: "The id must be type number"});

        this.salesServices.getId(+id)
            .then(saleId => res.status(202).json(saleId))
            .catch(error => this.handleError(error, res));
    };  

    updateSale=(req:Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message: "The id must be type number"});

        const [error, saleData] = SalesUpdateDto.update(req.body);

        if(error) return res.status(422).json(error);

        this.salesServices.update(saleData!, +id)
            .then(updateSale=> res.status(202).json(updateSale))
            .catch(error => this.handleError(error, res));
    };

    deleteSale=(req: Request, res:Response)=>{
        const {id} = req.params;

        if(isNaN(+id)) return res.status(400).json({message: "The id must be type number"});

        this.salesServices.delete(+id)
            .then(deleteSale=> res.status(202).json(deleteSale))
            .catch(error => this.handleError(error, res));
    };



};