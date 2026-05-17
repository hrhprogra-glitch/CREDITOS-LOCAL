using CAT_MODELOS;
using CAT_REPOSITORIO;
using CAT_UNITOFWORK;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;

namespace CAT_API.Controllers
{
    [Route("api/ModuloCierreCaja")]
    [ApiController]
    public class ApiModuloCierreCaja : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloCierreCaja(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getCierreCajaSaldos/{pAccion:int}/{pFechaIni}/{pFechaFin}")]
        public IActionResult getCierreCajaSaldos(int pAccion, string pFechaIni, string pFechaFin)
        {
            return Ok(unitWork.cierreCaja.getCierreCajaSaldos(pAccion, pFechaIni, pFechaFin));
        }

        [HttpPost]
        [Route("CerrarCierreCajasSaldos")]

        public ActionResult CerrarCierreCajasSaldos(CierreCajaSaldos cierreCajaSaldos)
        {
            try
            {
                object res = unitWork.cierreCaja.CerrarCierreCajaSaldos(cierreCajaSaldos);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("CerrarCierreCajasSaldos", error.Message.ToString(), 0, JsonConvert.SerializeObject(cierreCajaSaldos).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("getCierreCajaUtilidad/{pAccion:int}/{pFechaIni}/{pFechaFin}")]
        public IActionResult getCierreCajaUtilidad(int pAccion, string pFechaIni, string pFechaFin)
        {
            return Ok(unitWork.cierreCaja.getCierreCajaUtilidad(pAccion, pFechaIni, pFechaFin));
        }

        [HttpPost]
        [Route("CerrarCierreCajasUtilidad")]
        public ActionResult CerrarCierreCajasUtilidad(CierreCajaUtilidad cierreCajaUtilidad)
        {
            try
            {
                object res = unitWork.cierreCaja.CerrarCierreCajaUtilidad(cierreCajaUtilidad, JsonConvert.SerializeObject(cierreCajaUtilidad.DETALLE_CIERRE_UTILIDAD).ToString());

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("CerrarCierreCajasUtilidad", error.Message.ToString(), 0, JsonConvert.SerializeObject(cierreCajaUtilidad).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("getResumenpagossegunlistacobranza/{pAccion:int}/{pFechaIni}")]
        public IActionResult getResumenpagossegunlistacobranza(int pAccion, string pFechaIni)
        {
            return Ok(unitWork.cierreCaja.getResumenpagossegunlistacobranza(pAccion, pFechaIni));
        }

        [HttpPost]
        [Route("RegistrarCierrecajaDiario")]

        public ActionResult RegistrarCierrecajaDiario(CierreDiario cierreDiario)
        {
            try
            {
                object res = unitWork.cierreCaja.RegistrarCierrecajaDiario(cierreDiario.ACCION, JsonConvert.SerializeObject(cierreDiario).ToString(), cierreDiario.FECHA_CIERRE_CD, cierreDiario.CODIGO_CD);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("RegistrarCierrecajaDiario", error.Message.ToString(), 0, JsonConvert.SerializeObject(cierreDiario).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("listarcierrediariocaja/{pAccion:int}/{pCodigocd:int}")]
        public IActionResult Listarcierrediariocaja(int pAccion, int pCodigocd)
        {
            return Ok(unitWork.cierreCaja.getCierrecajaDiario(pAccion, pCodigocd));
        }
    }
}
