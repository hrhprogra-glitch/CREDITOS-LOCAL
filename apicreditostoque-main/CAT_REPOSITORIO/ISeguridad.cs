using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface ISeguridad
    {
        object getAutenticacionUsuario(int pAccion, string usuario, string passwword);
    }
}
