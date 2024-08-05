


import { Router } from "express";
import { InventarioController } from "./controller";
import { InventarioService } from "../services/inventario.service";
import { ProductoService } from "../services/producto.service";



export class InvetarioRoutes {

    
    static get routes(): Router {
        
        const router = Router();

        const productoService = new ProductoService()
        const service = new InventarioService(productoService)
        const controller = new InventarioController(service)

        router.post("/", controller.crearInventario)

        return router
    }

}