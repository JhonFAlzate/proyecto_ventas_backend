export class SalesCreateDto{
    constructor(
        public readonly cantidad : number
    ){};

    static create(object: {[key:string ] : any}):[string?, SalesCreateDto?]{
        const {cantidad} = object;

        if(!cantidad) return ["Missing catidad"];
        if(isNaN(+cantidad)) return ["Catidad type number"];


        return [undefined, new SalesCreateDto(cantidad)];
    };
};