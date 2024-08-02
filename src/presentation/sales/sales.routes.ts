import { Router } from "express";
import { SalesContoller } from "./sales.controller";
import { SalesServices } from "../services/sale.service";
import { UsuarioService } from "../services/usuario.service";
import { ProductoService } from "../services/producto.service";
import { AuthMiddleware } from "../middleware";

export class SalesRoutes{

    static get routes():Router{
        const router =  Router();

        const servicesUser =  new UsuarioService();
        const servicesProduct =  new ProductoService();

        const services = new SalesServices(servicesUser,servicesProduct );

        const contoller =  new SalesContoller(services);


        router.use(AuthMiddleware.protected);

        router.get("/", contoller.getAllSale);
        router.get("/:id", contoller.getSaleById);
        router.post("/", contoller.createSale);
        router.patch("/:id", contoller.updateSale);
        router.delete("/:id", contoller.deleteSale);
        
        return router;
    };
};
