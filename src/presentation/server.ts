import express, { Router } from "express";

interface Options {
  port: number;
  router?: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    // this.routes = options.router;
  }
  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port} 👌`);
    });
  }

  //Cambios hechos por yamil

  //cambios por jhon
}