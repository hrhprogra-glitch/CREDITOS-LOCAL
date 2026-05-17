using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface IDashboard
    {
        object getConsultarDashboard(int pAccion, int pEstadoCredito);
    }
}
