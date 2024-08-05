





export class UpdateProductosDto {

    private constructor(
        public readonly nombreProducto: string,
        public readonly tipoProducto: string,
        public readonly precioVenta: number,
        public readonly precioCompra: number,
    ){}

    static updateProducto ( object: {[key: string]: any}): [string?, UpdateProductosDto?]{
        const { nombreProducto, tipoProducto, precioVenta, precioCompra} = object;
        
        if(!nombreProducto) return ['Faltó el nombre del producto']
        if(!tipoProducto) return ['Faltó el tipo de prodcuto']
        if(!precioVenta) return ['Faltó el precio de venta']
        if(!precioCompra) return ['Falta precio de Compra']

        return [undefined, new UpdateProductosDto(nombreProducto, tipoProducto, precioVenta, precioCompra)]

    }
}