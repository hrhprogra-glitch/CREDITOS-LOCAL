export class ConsultarClientePorCodigo{
    constructor(
        public COD: number = 0,
        public CODTC: number = 0,
        public CODTDCLI: number = 0,
        public DOCCLI:string = "",
        public CLI:string ="",
        public TEL1:string ="",
        public TEL2:string ="",
        public CONY:string ="",
        public DIRCLI:string ="",
        public CO:string ="",
        public CODA: number = 0,
        public CLIA:string ="",
        public DIRA:string ="",
        public PMA: number = 0,
        public PRS: number = 0,
        public MORS :boolean = false
    ){}
}