export class CierreDiarioResumenListaCobranza{
    constructor(
        public CODIGO_CDRLB: number,
        public CODIGO_CD:number,
        public CODIGO_PERSONAL_CDRLB: number,
        public DESCRIPCION_CDRLB:string,
        public MONTO_EFECTIVO_CDRLB:number,
        public MONTO_DEPOSITO_CDRLB:number,
    ){}
}