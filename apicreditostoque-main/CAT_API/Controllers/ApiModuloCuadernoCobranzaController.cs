using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

using CAT_MODELOS;
using CAT_UNITOFWORK;
using Newtonsoft.Json;
namespace CAT_API.Controllers
{
    [Route("api/ModuloCuadernoCobranza")]
    [ApiController]
    public class ApiModuloCuadernoCobranzaController : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloCuadernoCobranzaController(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getListarCuadernoCobranza/{pAccion:int}")]
        public IActionResult getListarCuadernoCobranza(int pAccion)
        {
            return Ok(unitWork.cuadernoCobranza.getCuadernoCobranza(pAccion));
        }


        [HttpPost]
        [Route("GestionarCuadernoCobranzaCrud")]

        public ActionResult GestionarCuadernoCobranzaCrud(ActualizarCuadernoCobranza actualizarCuadernoCobranza)
        {
            try
            {
                object res = unitWork.cuadernoCobranza.ActualizarCuadernoCobranza(actualizarCuadernoCobranza);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("GestionarCuadernoCobranzaCrud", error.Message.ToString(), 0, JsonConvert.SerializeObject(actualizarCuadernoCobranza).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("getListarCuadernoCobranzaPorrangoFecha/{pAccion:int}/{pFechaIni}/{pFechaFin}")]
        public IActionResult getListarCuadernoCobranzaPorrangoFecha(int pAccion, string pFechaIni, string pFechaFin)
        {
            return Ok(unitWork.cuadernoCobranza.getCuadernoCobranzaPorRangoFecha(pAccion, pFechaIni, pFechaFin));
        }

        [HttpGet]
        [Route("getListarCuadernoCobranzaPorCodigoCuadernoCobranzas/{pAccion:int}/{pCodigoCuadernoCobranza:int}")]
        public IActionResult getListarCuadernoCobranzaPorCodigoCuadernoCobranzas(int pAccion, int pCodigoCuadernoCobranza)
        {
            return Ok(unitWork.cuadernoCobranza.getCuadernoCobranzaPorCodigoCuadernoCobranza(pAccion, pCodigoCuadernoCobranza));
        }

        [HttpPost]
        [Route("GestionarCuadernoActualizarNotas")]

        public ActionResult GestionarCuadernoActualizarNotas(CuadernoCobranzaNotas cuadernoCobranzaNotas)
        {
            try
            {
                object res = unitWork.cuadernoCobranza.ActualizarCuadernoCobranzaNotas(cuadernoCobranzaNotas);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("GestionarCuadernoActualizarNotas", error.Message.ToString(), 0, JsonConvert.SerializeObject(cuadernoCobranzaNotas).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("getNotasListadoCobranza/{pAccion:int}/{pCodigoCuadernoCobranza:int}/{pDiaCobranza:int}")]
        public IActionResult getNotasListadoCobranza(int pAccion, int pCodigoCuadernoCobranza, int pDiaCobranza)
        {
            return Ok(unitWork.cuadernoCobranza.GetNotasLiastadoCobranzas(pAccion, pCodigoCuadernoCobranza, pDiaCobranza));
        }

        [HttpGet]
        [Route("getListarCuadernoCobranzaDE/{pAccion:int}/{pCodigoCuadernoCobranza:int}/{pCodigoPersonalCobranza:int}")]
        public IActionResult getListarCuadernoCobranzaDE(int pAccion, int pCodigoCuadernoCobranza, int pCodigoPersonalCobranza)
        {
            return Ok(unitWork.cuadernoCobranza.getCuadernoCobranzaDepositoEfectivo(pAccion, pCodigoCuadernoCobranza, pCodigoPersonalCobranza));
        }

        [HttpPost]
        [Route("ActualizarCuadernoCobranzaEfectivoDeposito")]

        public ActionResult ActualizarCuadernoCobranzaEfectivoDeposito(ActualizarCuadernoCobranzaDepositoEfectivo actualizarCuadernoCobranza)
        {
            try
            {
                object res = unitWork.cuadernoCobranza.ActualizarCuadernoCobranzaDepositoEfectivo(actualizarCuadernoCobranza);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("ActualizarCuadernoCobranzaEfectivoDeposito", error.Message.ToString(), 0, JsonConvert.SerializeObject(actualizarCuadernoCobranza).ToString());

                return Ok("");

            }


        }

        [HttpPost]
        [Route("ActualizarNotaEfectivoDeposito")]

        public ActionResult ActualizarNotaEfectivoDeposito(ActualizarNotasDepositoEfectivo actualizarCuadernoCobranza)
        {
            try
            {
                object res = unitWork.cuadernoCobranza.ActualizarNotasDepositoEfectivo(actualizarCuadernoCobranza);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("ActualizarNotaEfectivoDeposito", error.Message.ToString(), 0, JsonConvert.SerializeObject(actualizarCuadernoCobranza).ToString());

                return Ok("");

            }


        }
    }
}
