export class SalesUpdateDto{
    constructor(
        public readonly cantidad : number
    ){};

    static update(object: {[key:string ] : any}):[string?, SalesUpdateDto?]{
        const {cantidad} = object;

        if(!cantidad) return ["Missing catidad"];
        if(isNaN(+cantidad)) return ["Catidad type number"];


        return [undefined, new SalesUpdateDto(cantidad)];
    };
};