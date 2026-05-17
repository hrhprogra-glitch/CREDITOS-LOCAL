using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAT_MODELOS;
using CAT_UNITOFWORK;

namespace CAT_API.Controllers
{
    [Route("api/ModuloSeguridad")]
    [ApiController]
    public class ApiSeguridadController : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiSeguridadController(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getAutenticacionUsuario/{pAccion:int}/{usuario}/{passwword}")]
        public IActionResult getAutenticacionUsuario(int pAccion, string usuario, string passwword)
        {
            return Ok(unitWork.seguridad.getAutenticacionUsuario(pAccion, usuario, passwword));
        }
    }
}
