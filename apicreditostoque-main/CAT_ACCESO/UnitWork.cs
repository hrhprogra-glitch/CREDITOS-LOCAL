using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CAT_REPOSITORIO;
using CAT_UNITOFWORK;

namespace CAT_ACCESO
{
    public class UnitWork : IUnitWork
    {
        public UnitWork (string pConectionObjects)
        {
            cliente = new ClienteRepositorio(pConectionObjects);
            credito = new RepositorioCredito(pConectionObjects);
            seguridad = new RepositorioSeguridad(pConectionObjects);
            cuadernoCobranza = new RepositorioCuadernoCobranza(pConectionObjects);
            aval = new RepositorioAval(pConectionObjects);
            ilog = new RepositorioLog(pConectionObjects);
            dashboard = new RepositorioDashboard(pConectionObjects);
            cierreCaja = new RepositorioCierreCaja(pConectionObjects);
            reporte = new RepositorioReportes(pConectionObjects);
        }

        public ICliente cliente { get; private set; }
        public ICredito credito { get; private set; }
        public ISeguridad seguridad { get; private set; }

        public ICuadernoCobranza cuadernoCobranza { get; private set; }
        public IAval aval { get; private set; }
        public Ilog ilog { get; private set; }
        public IDashboard dashboard { get; private set; }
        public ICierreCaja cierreCaja { get; private set; }
        public IReporte reporte { get; private set; }
    }
}
