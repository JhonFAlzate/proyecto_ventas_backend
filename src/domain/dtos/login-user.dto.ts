export class LoginUsuarioDTO {
  private constructor(
    public readonly telefono: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUsuarioDTO?] {
    const { telefono, password } = object;

    if (!telefono) return ["Se requiere el telefono"];
    if (!password) return ["Se requiere el password"];

    return [undefined, new LoginUsuarioDTO(telefono, password)];
  }
}
