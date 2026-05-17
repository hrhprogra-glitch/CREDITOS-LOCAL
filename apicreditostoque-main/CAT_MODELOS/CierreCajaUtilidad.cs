using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_MODELOS
{
    public class CierreCajaUtilidad
    {
        public int ANIO_CIERRECAJA_UTILIDAD { get; set; }
        public int MES_CIERRECAJA_UTILIDAD { get; set; }
        public string FECHAINI_CIERRECAJA_UTILIDAD { get; set; }
        public string FECHAFIN_CIERRECAJA_UTILIDAD { get; set; }
        public List<CierreCajaUtilidadDetalle> DETALLE_CIERRE_UTILIDAD { get; set; }
    }
}
