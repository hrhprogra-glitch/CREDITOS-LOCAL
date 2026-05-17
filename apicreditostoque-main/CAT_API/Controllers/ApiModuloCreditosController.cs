using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAT_MODELOS;
using CAT_UNITOFWORK;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;

namespace CAT_API.Controllers
{
    [Route("api/ModuloCreditos")]
    [ApiController]
    public class ApiModuloCreditosController : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloCreditosController(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getListarTipoCreditos/{pAccion:int}")]
        public IActionResult getListarTipoCreditos(int pAccion)
        {
            return Ok(unitWork.credito.getTipoCreditos(pAccion));
        }

        [HttpGet]
        [Route("getPersonalCobranzas/{pAccion:int}")]
        public IActionResult getPersonalCobranzas(int pAccion)
        {
            return Ok(unitWork.credito.getPersonalCobranza(pAccion));
        }

        [HttpPost]
        [Route("CalcularCronogramaPagos")]
        public IActionResult CalcularCronogramaPagos(CalcularCronograma calcularCronograma)
        {
            try
            {
                List<CronogramaPagos> eCronogramaPagos = new List<CronogramaPagos>();
                DateTime date = Convert.ToDateTime(calcularCronograma.pFechaInicioPago);
                decimal montoCuota = calcularCronograma.pTotalVenta / calcularCronograma.pNroCuotas;

                for (int nroCuota = 1; nroCuota <= calcularCronograma.pNroCuotas; nroCuota++)
                {

                    CronogramaPagos eCronograma = new CronogramaPagos();
                    eCronograma.fechaMin = date.ToString("yyyy-MM-dd");
                    date = date.AddDays(calcularCronograma.pDiasCredito);
                    eCronograma.FechaPagos = date.ToString("yyyy-MM-dd");
                    eCronograma.Nro_Cuota = nroCuota;
                    eCronograma.MontoCuota = decimal.Round(montoCuota, 2, MidpointRounding.ToEven);

                    eCronogramaPagos.Add(eCronograma);
                }

                return Ok(eCronogramaPagos);
            }
            catch (Exception error)
            {
                return Ok("");
            }


        }

        [HttpPost]
        [Route("GestionarCreditosCrud")]

        public ActionResult GestionarCreditosCrud(List<Credito> creditos)
        {
            try
            {
                object res = unitWork.credito.GestionarCréditoCrud(creditos[0].ACCION, JsonConvert.SerializeObject(creditos).ToString());

                return Ok(res);
            }
            catch (Exception error)
            {
                return Ok("");

            }


        }

        [HttpPost]
        [Route("GestionarCreditosCrudActualizarCuoata")]
        public ActionResult GestionarCreditosCrudActualizarCuoata(List<ActualizarCreditoCuota> creditos)
        {
            try
            {
                object res = unitWork.credito.GestionarCréditoCrud(creditos[0].ACCION, JsonConvert.SerializeObject(creditos).ToString());

                return Ok(res);
            }
            catch (Exception error)
            {
                return Ok("");

            }
        }


        [HttpGet]
        [Route("getGestionarCreditos_Consultas/{pAccion:int}/{pCodCredito:int}/{pCodCliente:int}")]
        public IActionResult getGestionarCreditos_Consultas(int pAccion, int pCodCredito, int pCodCliente)
        {
            return Ok(unitWork.credito.getGestionarCreditosCliente_Consultas(pAccion, pCodCredito, pCodCliente));
        }

        [HttpPost]
        [Route("GestionarCreditoActualizarObservaciones")]

        public ActionResult GestionarCreditoActualizarObservaciones( ActaulizarObservacionesCredito actaulizarObservacionesCredito)
        {
            try
            {
                object res = unitWork.credito.GestionarCreditoActualizarComentarioCrono(actaulizarObservacionesCredito.ACCION, actaulizarObservacionesCredito.CODIGO_DETALLE_CRONO, actaulizarObservacionesCredito.OBSERVACIONES);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("GestionarCreditoActualizarObservaciones", error.Message.ToString(), 0, JsonConvert.SerializeObject(actaulizarObservacionesCredito).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("ActualizarFechasPendientesCreditos")]
        public IActionResult ActualizarFechasPendientesCreditos()
        {
            return Ok(unitWork.credito.ActualizarFechasPendientesCreditos());
        }

        [HttpGet]
        [Route("ActualizarFechasPendientesCreditosPorCredito/{pCodigoCredito:int}")]
        public IActionResult ActualizarFechasPendientesCreditosPorCredito(int pCodigoCredito)
        {
            return Ok(unitWork.credito.ActualizarFechasPendientesCreditosPorCredito(pCodigoCredito));
        }

        [HttpGet]
        [Route("getListarClienresAll")]
        public IActionResult getListarClienresAll()
        {
            return Ok(unitWork.credito.GetlistarClientesAll());
        }

        [HttpGet]
        [Route("getCreditosPorFechaClienteCod/{pCodigoCliente:int}/{pFechaIni}/{pFechaFin}")]
        public IActionResult getCreditosPorFechaClienteCod(int pCodigoCliente, string pFechaIni, string pFechaFin)
        {
            return Ok(unitWork.credito.getCreditosPorFechaCliente(pCodigoCliente, pFechaIni, pFechaFin));
        }

        [HttpPost]
        [Route("inserteliminarformaentregacredito")]
        public ActionResult Inserteliminarformaentregacredito(CreditoFormaEntregaupd creditoFormaEntregaupd)
        {
            try
            {
                object res = unitWork.credito.InsertarEliminarFormaentregaCredito(creditoFormaEntregaupd);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("InsertSeguimientoCliente", error.Message.ToString(), 0, JsonConvert.SerializeObject(creditoFormaEntregaupd).ToString());
                return Ok("");

            }
        }

        [HttpGet]
        [Route("getlistarformaentregacredito/{pAccion:int}/{pCodigocre}")]
        public IActionResult getListarformaentregacredito(int pAccion, int pCodigocre)
        {
            return Ok(unitWork.credito.getListarformaentregacredito(pAccion, pCodigocre));
        }
    }
}
