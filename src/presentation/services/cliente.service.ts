import { Clientes } from "../../data";
import { CustomError } from "../../domain";
import { RegistrarClienteDTO } from "../../domain/dtos/clientes/clientes.dto";

export class ClienteService {
  constructor() {}

  async registarNuevoCliente(datosRegistroCliente: RegistrarClienteDTO) {
    const cliente = new Clientes();
    cliente.nombre = datosRegistroCliente.nombre;
    cliente.apellido = datosRegistroCliente.apellido;
    cliente.telefono = datosRegistroCliente.telefono;

    try {
      await cliente.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }
}
