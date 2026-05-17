using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using CAT_MODELOS;
using CAT_UNITOFWORK;
using Newtonsoft.Json;
namespace CAT_API.Controllers
{
    [Route("api/ModuloAval")]
    [ApiController]
    public class ApiModuloAvalController : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloAvalController(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpPost("GestionarAvalCrud")]
        public ActionResult GestionarAvalCrud([FromBody] List<Aval> avals)
        {
            try
            {
                object res = unitWork.aval.GestionarAvalCrud(avals[0].ACCION, JsonConvert.SerializeObject(avals).ToString());

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("GestionarAvalCrud",error.Message.ToString(),0, JsonConvert.SerializeObject(avals).ToString());
                return Ok("");

            }


        }

        [HttpGet]
        [Route("getListarAval/{pAccion:int}/{pCodigoAval:int}")]
        public IActionResult getListarAval(int pAccion, int pCodigoAval)
        {
            return Ok(unitWork.aval.ListarAaval(pAccion, pCodigoAval));
        }
    }
}
