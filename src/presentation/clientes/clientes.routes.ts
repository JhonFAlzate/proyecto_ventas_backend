import { Router } from "express";
import { ClienteService } from "../services/cliente.service";
import { ClientesController } from "./cliente.controller";

export class ClientesRoutes {
  static get routes(): Router {
    const router = Router();

    const clienteService = new ClienteService();
    const controller = new ClientesController(clienteService);

    router.post("/registrar-cliente", controller.registro);

    return router;
  }
}
