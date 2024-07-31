import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //router.use('/api/v1/auth', AuthRoutes.routes)

    //router.use()
    //TODO: aca tambien iran todos los metodos que necesitamos para gestionar los los purchases

    return router;
  }
}
