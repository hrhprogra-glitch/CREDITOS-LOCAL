export class ConsultarCreditosporcodigo{
    constructor(
        public CODC: number,
        public CODCLI: number,
        public CLI:string,
        public DIRC:string,
        public MONC:number,
        public CODTC:number,
        public NUMC:number,
        public FIC:string,
        public SMONP:number,
        public SMONS:number,
        public DESCTC:string,
        public JSON_CRONO : ConsultarCreditosporcodigoDetalle[]
    ){}
}

export class ConsultarCreditosporcodigoDetalle{
    constructor(
        public NUMC:number,
        public FV: string,
        public MONC:number,
        public FNP: string,
        public FP: string,
        public MONP:number,
        public MONS:number
    ){}
}