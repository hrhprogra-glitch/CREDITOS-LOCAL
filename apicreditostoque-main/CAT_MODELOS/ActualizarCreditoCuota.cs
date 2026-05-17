using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_MODELOS
{
    public class ActualizarCreditoCuota
    {
        public int ACCION { get; set; }
        public int CODIGO_CREDITO { get; set; }
        public int NUM_CUOTA { get; set; }
        public decimal MONTO_A_PAGAR { get; set; }
        public int COD_USUARIO { get; set; }
    }
}
