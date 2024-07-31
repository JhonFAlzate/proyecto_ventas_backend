import { Usuarios } from "../../data";
import { CustomError, RegistrarUsuarioDTO } from "../../domain";

export class UsuarioService {
  constructor() {}

  async registarNuevoUsuario(datosRegistroUsuario: RegistrarUsuarioDTO) {
    const user = new Usuarios();
    user.nombre = datosRegistroUsuario.nobre;
    user.apellido = datosRegistroUsuario.apellido;
    user.password = datosRegistroUsuario.password;

    try {
      await user.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }
}
