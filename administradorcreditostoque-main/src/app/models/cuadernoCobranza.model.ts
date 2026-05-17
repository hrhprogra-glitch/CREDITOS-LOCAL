export class CuadernoCobranza{
    constructor(
        public JSON_HEADER : CuadernoCobranzaHeaderTabel[],
        public SUM_TLU: CuadernoCobranzaPersonalTotales[],
        public SUM_TMA : CuadernoCobranzaPersonalTotales[],
        public SUM_TMI: CuadernoCobranzaPersonalTotales[],
        public SUM_TJU : CuadernoCobranzaPersonalTotales[],
        public SUM_TVI : CuadernoCobranzaPersonalTotales[],
        public SUM_TSA : CuadernoCobranzaPersonalTotales[],
        public SUM_TDO : CuadernoCobranzaPersonalTotales[],
        public JSON_CREDITOS : CuadernoCobranzaListCre[] ,
        public JSON_LISTACO_ANT : CuadernoCobranzaAnterior[] 
    ){}
}

export class CuadernoCobranzaListCre{
    constructor(
        public COD_CR: number,
        public COD_CLI: number,
        public CLI:string,
        public COD_CUA:number,
        public PERSONAL_LIST_LU : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_MA : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_MI : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_JU : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_VI : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_SA : CuadernoCobranzaPersonal[],
        public PERSONAL_LIST_DO : CuadernoCobranzaPersonal[],
        public VIG_CC : string,
        public EST_CC :number,
        public FE_CRE : string,
        public MONT_CU : string,
        public NOTA : string ,
        public FE_VEN : string ,
        public FE_VENF : number ,
        public EST_CR : number
    ){}
}

export class CuadernoCobranzaPersonal{
    constructor(
        public NOM_PER:string,
        public COD_PER: number,
        public M_DIA:number,
        public CLASS: string,
        public MOD_MONTO : number,
        public BUTT_BLO : number,
        public CLASS_DC : string,
        public CLASS_DV: string
    ){}
}

export class CuadernoCobranzaPersonalTotales{
    constructor(
        public COD_PER:number,
        public MON_T: number,
        public CLASS: string
    ){}
}

export class CuadernoCobranzaHeaderTabel{
    constructor(
        public F:string
    ){}
}

export class CuadernoCobranzaAnterior{
    constructor(
        public COD_CUCO:number,
        public SEM : string,
        public CLASS_CUCO : string
    ){}
}