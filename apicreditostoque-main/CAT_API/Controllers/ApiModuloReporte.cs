using CAT_UNITOFWORK;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CAT_API.Controllers
{
    [Route("api/ModuloReporte")]
    [ApiController]
    public class ApiModuloReporte : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloReporte(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getcreditossegunformaentregaxfecha/{pAccion:int}/{pFechaIni}/{pFechaFin}")]
        public IActionResult getConsultarDashboars(int pAccion, string pFechaIni, string pFechaFin)
        {
            return Ok(unitWork.reporte.getCreditosSegunformaentregaporfecha(pAccion, pFechaIni, pFechaFin));
        }
    }
}
