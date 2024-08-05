



export class ProductoDto {

    private constructor(
        public readonly nombreProducto: string,
        public readonly tipoProducto: string,
        public readonly precioVenta: number,
        public readonly precioCompra: number,
    ){}

    static createProductoDto ( object: {[key: string]: any}): [string?, ProductoDto?]{
        const { nombreProducto, tipoProducto, precioVenta, precioCompra} = object;
        
        if(!nombreProducto) return ['Faltó el nombre del producto']
        if(!tipoProducto) return ['Faltó el tipo de prodcuto']
        if(!precioVenta) return ['Faltó el precio de venta']
        if(!precioCompra) return ['Fata el precio de compra']
        

        return [undefined, new ProductoDto(nombreProducto, tipoProducto, precioVenta, precioCompra)]

    }
}
