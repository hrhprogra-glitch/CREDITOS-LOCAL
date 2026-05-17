using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface IAval
    {
        object GestionarAvalCrud(int pAccion, string JsonAval);
        object ListarAaval(int pAccion, int pCodigoAval);
    }
}
