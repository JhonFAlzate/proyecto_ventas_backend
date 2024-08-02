export class RegistrarClienteDTO {
  private constructor(
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly telefono: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, RegistrarClienteDTO?] {
    const { nombre, apellido, telefono } = object;

    if (!nombre) return ["Se requiere nombre"];
    if (!apellido) return ["Se requiere apellido"];
    if (!telefono) return ["Se requiere telefono"];

    return [undefined, new RegistrarClienteDTO(nombre, apellido, telefono)];
  }
}
