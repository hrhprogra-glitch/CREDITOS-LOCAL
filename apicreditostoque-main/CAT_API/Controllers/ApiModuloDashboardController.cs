using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAT_MODELOS;
using CAT_UNITOFWORK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CAT_API.Controllers
{
    [Route("api/ModuloDashboard")]
    [ApiController]
    public class ApiModuloDashboardController : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloDashboardController(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getConsultarDashboars/{pAccion:int}/{pEstadoCredito:int}")]
        public IActionResult getConsultarDashboars(int pAccion, int pEstadoCredito)
        {
            return Ok(unitWork.dashboard.getConsultarDashboard(pAccion, pEstadoCredito));
        }
    }
}
