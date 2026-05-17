import { CierreCajaUtilidadDetalle } from "./CierreUtilidadDetalle.model";

export class CierreCajaUtilidad{
    constructor(
        public ANIO_CIERRECAJA_UTILIDAD: number,
        public MES_CIERRECAJA_UTILIDAD:number,
        public FECHAINI_CIERRECAJA_UTILIDAD:string,
        public FECHAFIN_CIERRECAJA_UTILIDAD:string,
        public DETALLE_CIERRE_UTILIDAD:CierreCajaUtilidadDetalle[]
    ){}
}