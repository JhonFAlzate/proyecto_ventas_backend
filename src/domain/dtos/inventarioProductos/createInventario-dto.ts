



export class CreateInventarioDto {

    private constructor(
        public readonly productoId: number,
        public readonly cantidadStock: number,
    ){}

    static createUser ( object: {[key: string]: any}): [string?, CreateInventarioDto?]{
        const { productoId, cantidadStock} = object

        if(!productoId) return ['Falta el id del producto']
        if(!cantidadStock) return ['Falta Cantidad en stock']

        return [undefined, new CreateInventarioDto(productoId, cantidadStock)]

    }
}