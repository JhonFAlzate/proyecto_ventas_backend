import { Router } from "express";
import { UsuarioRoutes } from "./usuarios/usuarios.routes";
import { ProductosRoutes } from "./productos/route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/usuario", UsuarioRoutes.routes);
    router.use("/api/v1/productos", ProductosRoutes.routes);

    return router;
  }
}
