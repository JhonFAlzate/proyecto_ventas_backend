import { Router } from "express";
import { UsuarioService } from "../services/usuario.service";
import { UsuariosController } from "./usuarios.controller";

export class UsuarioRoutes {
  static get routes(): Router {
    const router = Router();

    const usuarioServce = new UsuarioService();
    const controller = new UsuariosController(usuarioServce);

    router.post("/registrarse", controller.registro);
    router.post("/login", controller.login);
    router.delete("/eliminar-usuario/:id", controller.eliminarUsuarioPorId);
    router.put("/actualizar-usuario/:id", controller.actualizarUsuiarioPorSuId);

    router.get("/perfil/:id", controller.obtenerPerfilUsuarioPorId);
    return router;
  }
}
