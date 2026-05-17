using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_MODELOS
{
    public class CierreDiario
    {
        public int ACCION { get ; set; }
        public int CODIGO_CD { get; set; }
        public string FECHA_CIERRE_CD { get; set; }
        public decimal TOTAL_OFICINA_CD { get; set; }
        public decimal TOTAL_LISTA_COBRANZA_CD { get; set; }
        public decimal TOTAL_GASTOS_CD { get; set; }
        public decimal TOTAL_CIERRE_CD { get; set; }
        public List<CierreDiarioResumenCobranzaOficina> RESUMEN_COBRANZA_OFICINA { get; set; }
        public List<CierreDiarioResumenGastos> RESUMEN_GASTOS { get; set; }
        public List<CierreDiarioResumenListaCobranza> RESUMEN_LISTA_COBRANZA { get; set; }

    }

    public class CierreDiarioResumenCobranzaOficina
    {
        public int CODIGO_CDRCO { get; set; }
        public int CODIGO_CD { get; set ; }
        public string NOMBRE_CLIENTE_CDRCO { get ; set;}
        public decimal MONTO_CDRCO { get; set; } 
        public string QUIEN_RECIBIO_CDRCO { get; set; }
        public string OBSERVACIONES_CDRCO { get; set; }
    }

    public class CierreDiarioResumenGastos
    {
        public int CODIGO_CDRG { get; set; }
        public int CODIGO_CD { get; set; }
        public string DESCRIPCION_CDRG { get; set; }
        public decimal MONTO_CDRG { get; set; }
    }

    public class CierreDiarioResumenListaCobranza
    {
        public int CODIGO_CDRLB { get; set; }
        public int CODIGO_CD { get; set; }
        public int CODIGO_PERSONAL_CDRLB { get; set; }
        public string DESCRIPCION_CDRLB { get; set; }
        public decimal MONTO_EFECTIVO_CDRLB { get; set; }
        public decimal MONTO_DEPOSITO_CDRLB { get; set; }
    }
}
