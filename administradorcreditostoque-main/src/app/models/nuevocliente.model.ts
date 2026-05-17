export class NuevoCliente{
    constructor(
        public ACCION: number,
        public CODIGO_CLIENTE: number,
        public NOMBRES_CLIENTE:string,
        public CONYUGE_CLIENTE:string,
        public DIRECCION_CLIENTE:string,
        public TELEFONO1_CLIENTE:string,
        public TELEFONO2_CLIENTE:string,
        public AVAL_CLIENTE:number,
        public CORREO_CLIENTE:string,
        public CREAUSU_CLIENTE:number,
        public CODIGO_TIPOLI:number,
        public RAZONSOCIAL_CLIENTE:string,
        public CODIGO_TIPODOCLI:number,
        public DOCUMENTO_CLIENTE:string,
        public MOROSO_CLIENTE : number
    ){}
}