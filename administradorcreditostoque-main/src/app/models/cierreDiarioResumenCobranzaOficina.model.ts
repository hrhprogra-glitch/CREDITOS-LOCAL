export class CierreDiarioResumenCobranzaOficina{
    constructor(
        public CODIGO_CDRCO: number,
        public CODIGO_CD:number,
        public NOMBRE_CLIENTE_CDRCO:string,
        public MONTO_CDRCO:number,
        public QUIEN_RECIBIO_CDRCO:string,
        public OBSERVACIONES_CDRCO:string
    ){}
}