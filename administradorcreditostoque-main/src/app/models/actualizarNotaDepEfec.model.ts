export class ActualizarNotasDepEfec{
    constructor(
        public ACCION: number,
        public CODIGO_CUADERNO_COBRANZA: number,
        public CODIGO_CLIENTE:number,
        public CODIGO_PERSONAL_COBRANZA:number,
        public CODIGO_CREDITO:number,
        public NOTAS:string
    ){}
}