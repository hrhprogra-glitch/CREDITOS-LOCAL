export class cuadernoCobranzaHistorial{
    constructor(
        public CODC: number,
        public CODCLI: number,
        public CLI:string,
        public MONC:number,
        public NUMC:number,
        public MONCU:number,
        public FEEN:string,
        public FIC:string,
        public FFC:number,
        public DES_TC: string,
        public DETA_TC : string,
        public NOTA : string,
        public JSON_CRONO : cuadernoCobranzaHistorialDetalle[]
    ){}
}

export class cuadernoCobranzaHistorialDetalle{
    constructor(
        public COD_CRE:number,
        public NUMC:number,
        public FPAGO: string,
        public MONS:string,
        public MONP: string,
        public PAGO: string
    ){}
}