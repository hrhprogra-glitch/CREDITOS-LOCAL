export class ActualizarCuadernoCobranzaDepEfec{
    constructor(
        public ACCION: number,
        public ACCION_DE: number,
        public CODIGO_CUADERNO_COBRANZA: number,
        public CODIGO_CLIENTE:number,
        public CODIGO_PERSONAL_COBRANZA:number,
        public CODIGO_CREDITO:number,
        public MONTO_PAGADO:number
    ){}
}