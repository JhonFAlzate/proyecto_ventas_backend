export class RegistrarUsuarioDTO {
  private constructor(
    public readonly nobre: string,
    public readonly apellido: string,
    public readonly password: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, RegistrarUsuarioDTO?] {
    const { nobre, apellido, password } = object;

    if (!nobre) return ["Se requiere nobre"];
    if (!apellido) return ["Se requiere apellido"];
    if (!password) return ["Se requiere password"];

    return [undefined, new RegistrarUsuarioDTO(nobre, apellido, password)];
  }
}
