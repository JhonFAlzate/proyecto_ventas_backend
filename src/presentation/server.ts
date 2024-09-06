import express, { Router } from "express";
import cors from 'cors';

import morgan from 'morgan';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly aceptedOrigins: string[] = ['http://localhost:5173', 'http://localhost:4200']

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }
  async start() {

    //Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use( cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); 
    
        if (this.aceptedOrigins.includes(origin)) {
          return callback(null, true);
        }
    
        return callback(new Error('Access not allowed by CORS'));
      }
    }) )


    this.app.use(morgan('dev'));
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port} 👌`);
    });
  }
}
