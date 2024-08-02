import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Usuarios } from "../../data";
import { Status } from "../../data/postgres/models/@types/usuarios.types";
import {
  CustomError,
  LoginUsuarioDTO,
  RegistrarUsuarioDTO,
} from "../../domain";
import { ActualizarUsuarioDTO } from "../../domain/dtos/update-user.dto";

export class UsuarioService {
  constructor() {}

  async registarNuevoUsuario(datosRegistroUsuario: RegistrarUsuarioDTO) {
    const usuarioExiste = await Usuarios.findOne({
      where: {
        telefono: datosRegistroUsuario.telefono,
        status: Status.ACTIVO,
      },
    });

    if (usuarioExiste)
      throw CustomError.badRequest("Este numero de telefono ya existe");

    const user = new Usuarios();
    user.nombre = datosRegistroUsuario.nombre;
    user.apellido = datosRegistroUsuario.apellido;
    user.telefono = datosRegistroUsuario.telefono;
    user.password = datosRegistroUsuario.password;

    try {
      await user.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async loginUsuario(datosLoginUsuario: LoginUsuarioDTO) {
    const usuario = await Usuarios.findOne({
      where: {
        telefono: datosLoginUsuario.telefono,
        status: Status.ACTIVO,
      },
    });

    if (!usuario) throw CustomError.unAuthorized("Datos incorrectos");

    const passwordsCoinciden = bcryptAdapter.compare(
      datosLoginUsuario.password,
      usuario.password
    );

    if (!passwordsCoinciden)
      throw CustomError.unAuthorized("Datos incorrectos");

    const token = await JwtAdapter.generateToken({ id: usuario.id });
    if (!token) throw CustomError.internalServer("No se pudo generar un token");

    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        role: usuario.role,
      },
    };
  }

  async actualizarUsuario(datosUsuario: ActualizarUsuarioDTO, id: number) {
    const usuario = await this.encontrarUsuarioPorId(id);

    if (!usuario) throw CustomError.notFound("User not found");

    usuario.nombre = datosUsuario.nombre;
    usuario.apellido = datosUsuario.apellido;
    usuario.telefono = datosUsuario.telefono;
    usuario.password = datosUsuario.password;
    usuario.role = datosUsuario.role;

    try {
      await usuario.save();
      return {
        ok: true,
      };
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async borrarUsuarioPorId(id: number) {
    const usuario = await this.encontrarUsuarioPorId(id);

    if (!usuario) throw CustomError.notFound("User not found");

    usuario.status = Status.INACTIVO;

    try {
      await usuario.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong");
    }
  }

  async encontrarUsuarioPorId(id: number) {
    const usuario = await Usuarios.findOne({
      where: {
        id,
        status: Status.ACTIVO,
      },
    });

    // if (!usuario) throw CustomError.notFound("User not found");

    return usuario;
  }

  async obtenerPerfilDeUsuarioPorId(id: number) {
    const usuario = await Usuarios.findOne({
      where: {
        id,
      }
    });

    if (!usuario) throw CustomError.notFound("Usuario no encontrado");

    return usuario;
  }
}
