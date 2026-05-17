using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface IReporte
    {
        object getCreditosSegunformaentregaporfecha(int pAccion, string pFechaIni, string pFechaFin);
    }
}
