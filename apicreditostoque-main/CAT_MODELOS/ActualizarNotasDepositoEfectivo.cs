using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_MODELOS
{
    public class ActualizarNotasDepositoEfectivo
    {
        public int ACCION { get; set; }
        public int CODIGO_CUADERNO_COBRANZA { get; set; }
        public int CODIGO_CLIENTE { get; set; }
        public int CODIGO_PERSONAL_COBRANZA { get; set; }

        public int CODIGO_CREDITO { get; set; }

        public string NOTAS { get; set; }
    }
}
