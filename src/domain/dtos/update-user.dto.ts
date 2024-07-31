import { RolDeUsuario } from "../../data/postgres/models/@types/usuarios.types";

export class ActualizarUsuarioDTO {
  private constructor(
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly telefono: string,
    public readonly password: string,
    public readonly role: RolDeUsuario
  ) {}

  static update(object: {
    [key: string]: any;
  }): [string?, ActualizarUsuarioDTO?] {
    const { nombre, apellido, telefono, password, role } = object;

    if (!nombre) return ["Se requiere nombre"];
    if (!apellido) return ["Se requiere apellido"];
    if (!telefono) return ["Se requiere telefono"];
    if (!password) return ["Se requiere password"];
    if (!role) return ["Se requiere role"];

    return [
      undefined,
      new ActualizarUsuarioDTO(nombre, apellido, telefono, password, role),
    ];
  }
}
