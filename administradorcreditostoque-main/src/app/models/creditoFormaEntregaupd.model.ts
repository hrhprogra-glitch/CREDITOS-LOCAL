export class CreditoFormaEntregaupd{
    constructor(
        public ACCION :number,
        public CODIGO_CREDITO:number,
        public CODIGO_CREDITO_E:number,
        public CODIGO_ENTREGA: number,
        public MONTO_ENTREGA:number,
        public NOTAS_ENTREGA:string
    ){}
}