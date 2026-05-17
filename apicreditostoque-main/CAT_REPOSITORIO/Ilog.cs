using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface Ilog
    {
        void RegistrarLogError(string pMetodo, string pError, int pNumeroError, string pInput);
    }
}
