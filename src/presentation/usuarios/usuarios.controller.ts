import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import {
  CustomError,
  LoginUsuarioDTO,
  RegistrarUsuarioDTO,
} from "../../domain";
import { ActualizarUsuarioDTO } from "../../domain/dtos/update-user.dto";

export class UsuariosController {
  constructor(private readonly usuariosService: UsuarioService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  registro = async (req: Request, res: Response) => {
    const [error, registrarUsuarioDTO] = RegistrarUsuarioDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.usuariosService
      .registarNuevoUsuario(registrarUsuarioDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  login = async (req: Request, res: Response) => {
    const [error, loginUsuarioDTO] = LoginUsuarioDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.usuariosService
      .loginUsuario(loginUsuarioDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  actualizarUsuiarioPorSuId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, actualizarUsuarioDTO] = ActualizarUsuarioDTO.update(req.body);

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }

    if (error) return res.status(422).json({ message: error });

    this.usuariosService
      .actualizarUsuario(actualizarUsuarioDTO!, +id)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  eliminarUsuarioPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.usuariosService
      .borrarUsuarioPorId(+id)
      .then(() => res.status(204).json())
      .catch((error: unknown) => res.status(500).json(error));
  };

  obtenerPerfilUsuarioPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser un numero" });
    }

    this.usuariosService
      .obtenerPerfilDeUsuarioPorId(+id)
      .then((data) => res.status(200).json(data))
      .catch((error: unknown) => this.handleError(error, res));
  };
}
