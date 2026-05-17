using CAT_MODELOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAT_REPOSITORIO
{
    public interface ICredito
    {
        object getTipoCreditos(int pAccion);
        object GestionarCréditoCrud(int pAccion, string JsonCredito);
        object getGestionarCreditosCliente_Consultas(int pAccion, int pCodCredito, int pCodCliente);
        object GestionarCreditoActualizarComentarioCrono(int pAccion, int pCodigoCredCrenoDeta, string pObservaciones);
        object ActualizarFechasPendientesCreditos();
        object ActualizarFechasPendientesCreditosPorCredito(int pCodigoCredito);
        object GetlistarClientesAll();
        object getCreditosPorFechaCliente(int pCodigoCliente, string pFechaIni, string pFechaFin);
        object getPersonalCobranza(int pAccion);
        object InsertarEliminarFormaentregaCredito(CreditoFormaEntregaupd creditoFormaEntregaupd);
        object getListarformaentregacredito(int pAccion, int pCodigoCredito);
    }
}
