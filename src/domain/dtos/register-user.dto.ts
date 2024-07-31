export class RegistrarUsuarioDTO {
  private constructor(
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly telefono: string,
    public readonly password: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, RegistrarUsuarioDTO?] {
    const { nombre, apellido, telefono, password } = object;

    if (!nombre) return ["Se requiere nombre"];
    if (!apellido) return ["Se requiere apellido"];
    if (!telefono) return ["Se requiere telefono"];
    if (!password) return ["Se requiere password"];

    return [
      undefined,
      new RegistrarUsuarioDTO(nombre, apellido, telefono, password),
    ];
  }
}
