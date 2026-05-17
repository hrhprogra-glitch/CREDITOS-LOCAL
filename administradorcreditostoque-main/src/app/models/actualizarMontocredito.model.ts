export class ActualizarMontoCredito{
    constructor(
        public ACCION: number,
        public CODIGO_CREDITO:number,
        public NUM_CUOTA:number,
        public MONTO_A_PAGAR:number,
        public COD_USUARIO :Number
    ){}
}