import { CreditoCronograma } from './CreditoCronograma.model';
import { CreditoPersonalCobranza } from './CreditoPersonalCobranza.model';
import { CreditoFormaEntrega } from './creditoFormaEntrega.model';

export class Credito{
    constructor(
        public ACCION: number,
        public CODIGO_CREDITO:number,
        public CODIGO_CLIENTE:number,
        public CODIGO_TCREDITO:number,
        public MONTO_CREDITO:number,
        public NUMCUOTA_CREDITO:number,
        public FECHAINI_CREDITO:string,
        public CREAUSU_CREDITO:number,
        public FECHAFIN_CREDITO: string, 
        public FECHAENTR_CREDITO: string, 
        public MONTOCUOTA_CREDITO:number, 
        public DIACOBRO_CREDITO:number,
        public NOTAS_CREDITO : string,
        public creditoCronogramas : CreditoCronograma[],
        public creditoPersonalCobranza : CreditoPersonalCobranza[],
        public MONTO_UTILIDAD_CREDITO : number,
        public MONTOPARTIAL_CREDITO: number,
        public TIPO_RELACION:number,
        public CODIGO_CREDITO_REF:Number,
        public FORMA_ENTREGA:CreditoFormaEntrega[]
    ){}
}