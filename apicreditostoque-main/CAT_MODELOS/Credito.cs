using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_MODELOS
{
    public class Credito
    {
        public int ACCION { get; set; }
        public int CODIGO_CREDITO { get; set; }
        public int CODIGO_CLIENTE { get; set; }
        public int CODIGO_TCREDITO { get; set; }
        public decimal MONTO_CREDITO { get; set; }
        public int NUMCUOTA_CREDITO { get; set; }
        public string FECHAINI_CREDITO { get; set; }

        public int CREAUSU_CREDITO { get; set; }
        public List<CreditoCronograma> creditoCronogramas { get; set; }
        public string FECHAFIN_CREDITO { get; set; }
        public string FECHAENTR_CREDITO { get; set; }
        public decimal MONTOCUOTA_CREDITO { get; set; }
        public int DIACOBRO_CREDITO { get; set; }
        public string NOTAS_CREDITO { get; set; }
        public decimal MONTO_UTILIDAD_CREDITO { get; set; }
        public decimal MONTOPARTIAL_CREDITO { get; set; }

        public List<CreditoPersonalCobranza> creditoPersonalCobranza { get; set; }
        public int TIPO_RELACION { get; set; }
        public int CODIGO_CREDITO_REF { get; set; }

        public List<CreditoFormaEntrega> FORMA_ENTREGA { get; set; }
    }

    public class CreditoCronograma
    {
        public int CODIGO_CREDITO { get; set; }
        public int NUMCUOTA_CREDCRO { get; set; }
        public string FECHAVEN_CREDCRO { get; set; }
        public decimal MONCUOTA_CREDCRO { get; set; }

        public int CREAUSU_CREDITO { get; set; }
    }

    public class CreditoPersonalCobranza
    {
        public int CODIGO_CREDITO { get; set; }
        public int CODIGO_PERSONAL_COBRANZA { get; set; }
    }

    public class CreditoFormaEntrega
    {
        public int TIPO_ENTREGA_E { get; set; }
        public decimal MONTO_ENTREGA_E { get; set; }
        public string NOTAS_CREDITO_E { get; set; }
    }
}
