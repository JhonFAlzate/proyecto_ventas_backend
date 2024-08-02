import { Router } from "express";
import { UsuarioRoutes } from "./usuarios/usuarios.routes";
import { ProductosRoutes } from "./productos/route";
import { SalesRoutes } from "./sales/sales.routes";
import { ClientesRoutes } from "./clientes/clientes.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/usuario", UsuarioRoutes.routes);
    router.use("/api/v1/productos", ProductosRoutes.routes);
    router.use("/api/v1/sales", SalesRoutes.routes);
    router.use("/api/v1/clientes", ClientesRoutes.routes);

    return router;
  }
}
