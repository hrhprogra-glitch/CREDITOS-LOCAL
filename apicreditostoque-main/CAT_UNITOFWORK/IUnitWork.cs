using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAT_REPOSITORIO;
namespace CAT_UNITOFWORK
{
    public interface IUnitWork
    {
        ICliente cliente { get; }
        ICredito credito { get; }
        ISeguridad seguridad { get;  }

        ICuadernoCobranza cuadernoCobranza { get; }
        IAval aval { get; }

        Ilog ilog { get;  }

        IDashboard dashboard { get; }
        ICierreCaja cierreCaja { get; }
        IReporte reporte { get; }
    }
}
