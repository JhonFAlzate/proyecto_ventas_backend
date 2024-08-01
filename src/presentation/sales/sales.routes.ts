import { Router } from "express";
import { SalesContoller } from "./sales.controller";
import { SalesServices } from "../services/sale.service";

export class SalesRoutes{

    static get routes():Router{
        const router =  Router();

        const services = new SalesServices();

        const contoller =  new SalesContoller(services);


        router.get("/", contoller.getAllSale);
        router.get("/:id", contoller.getSaleById);
        router.post("/", contoller.createSale);
        router.patch("/:id", contoller.updateSale);
        router.delete("/:id", contoller.deleteSale);
        
        return router;
    };
};
