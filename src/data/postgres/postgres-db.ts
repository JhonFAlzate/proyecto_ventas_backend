import { DataSource } from "typeorm";
import { Clientes } from "./models/clientes.model";
import { Inventario } from "./models/inventarioProducto.model";
import { Producto } from "./models/producto.model";
import { Usuarios } from "./models/usuarios.model";
import { Ventas } from "./models/ventas.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  public datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      entities: [Clientes, Inventario, Producto, Usuarios, Ventas],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Conectado a la Base de datos 😃");
    } catch (error) {
      console.log(error);
    }
  }
}
