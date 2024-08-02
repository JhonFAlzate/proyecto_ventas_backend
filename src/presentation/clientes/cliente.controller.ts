import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ClienteService } from "../services/cliente.service";
import { RegistrarClienteDTO } from "../../domain/dtos/clientes/clientes.dto";

export class ClientesController {
  constructor(private readonly clienteService: ClienteService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  registro = async (req: Request, res: Response) => {
    const [error, registrarClienteDTO] = RegistrarClienteDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.clienteService
      .registarNuevoCliente(registrarClienteDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
