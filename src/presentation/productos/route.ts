

import { Router } from "express";
import { ProductosController } from "./controller";
import { ProductoService } from "../services/producto.service";



export class ProductosRoutes {

    static get routes(): Router {
        const router = Router();
        const productoService = new ProductoService();
        const controller = new ProductosController(productoService);

        router.post("/", controller.createProducto);
        router.get("/", controller.getAllProductos);
        router.get("/:id", controller.getOneProducto);
        router.patch("/:id", controller.updateProductos);
        router.delete("/:id", controller.deleteProductoById);

        return router;
    }

}