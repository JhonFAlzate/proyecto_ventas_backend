import { Router } from "express";
import { UsuarioRoutes } from "./usuarios/usuarios.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/usuario", UsuarioRoutes.routes);

    return router;
  }
}
