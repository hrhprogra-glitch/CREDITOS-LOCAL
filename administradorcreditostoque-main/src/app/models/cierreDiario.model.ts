import { CierreDiarioResumenCobranzaOficina } from "./cierreDiarioResumenCobranzaOficina.model";
import { CierreDiarioResumenGastos } from "./cierreDiarioResumenGastos.model";
import { CierreDiarioResumenListaCobranza } from "./cierreDiarioResumenListaCobranza.model";

export class CierreDiario{
    constructor(
        public ACCION: number,
        public CODIGO_CD:number,
        public FECHA_CIERRE_CD:string,
        public TOTAL_OFICINA_CD:number,
        public TOTAL_LISTA_COBRANZA_CD:number,
        public TOTAL_GASTOS_CD:number,
        public TOTAL_CIERRE_CD:number,
        public RESUMEN_COBRANZA_OFICINA:CierreDiarioResumenCobranzaOficina[],
        public RESUMEN_GASTOS:CierreDiarioResumenGastos[],
        public RESUMEN_LISTA_COBRANZA:CierreDiarioResumenListaCobranza[]
    ){}
}