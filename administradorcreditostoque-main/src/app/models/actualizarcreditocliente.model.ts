export class ActualizarCreditoCliente{
    constructor(
        public CODC: number,
        public CODCLI: number,
        public CLI:string,
        public DIR_CLI:string,
        public COD_TC:number,
        public DC_CRE:number,
        public FIC: string,
        public FFC : string,
        public FEEN : string ,
        public MONC : number,
        public NUMC : number,
        public MONCU : number,
        public NOTA : string,
        public RD_CRE : number,
        public JSON_CREPER : any[],
        public EST_CRE:Number,
        public MUC:number,
        public MPC: number,
        public JSON_CREENTRE : any[],
        public TCR:number,
        public COD_CRE_R:number
    ){}
}