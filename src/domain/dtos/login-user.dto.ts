export class LoginUsuarioDTO {
  private constructor(
    public readonly nombre: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUsuarioDTO?] {
    const { nombre, password } = object;

    if (!nombre) return ["Se requiere el nombre"];
    if (!password) return ["Se requiere el password"];

    return [undefined, new LoginUsuarioDTO(nombre, password)];
  }
}
