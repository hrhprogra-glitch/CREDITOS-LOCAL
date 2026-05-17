export class ConsultarCreditosporcliente{
    constructor(
        public CODC: number,
        public CLI:string,
        public MONC:number,
        public FIC:string,
        public SMONS:number,
        public EC:string,
        public ECC:string,
        public JSON_CRONO : ConsultarCreditosporclienteDetalle[]
    ){}
}

export class ConsultarCreditosporclienteDetalle{
    constructor(
        public NUMC:number,
        public FV: string,
        public MONC:number,
        public MONS:number
    ){}
}