using CAT_MODELOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface ICierreCaja
    {
        object getCierreCajaSaldos(int pAccion, string pFechaIni, string pFechaFin);
        object CerrarCierreCajaSaldos(CierreCajaSaldos cierreCajaSaldos);
        object getCierreCajaUtilidad(int pAccion, string pFechaIni, string pFechaFin);
        object CerrarCierreCajaUtilidad(CierreCajaUtilidad cierreCajaUtilidad, string pDetalleCierreCaja);
        object getResumenpagossegunlistacobranza(int pAccion, string pFechacierre);
        object RegistrarCierrecajaDiario(int pAccion, string pCierrediario, string pFechacierre, int pIdciere);
        object getCierrecajaDiario(int pAccion, int pCodigocierrediario);
    }
}
