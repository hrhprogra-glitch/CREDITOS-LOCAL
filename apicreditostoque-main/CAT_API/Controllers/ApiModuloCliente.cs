using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using CAT_MODELOS;
using CAT_UNITOFWORK;
using Newtonsoft.Json;
using System.Threading;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using static System.Net.WebRequestMethods;

namespace CAT_API.Controllers
{
    [Route("api/ModuloClientes")]
    [ApiController]
    public class ApiModuloCliente : ControllerBase
    {
        private readonly IUnitWork unitWork;

        public ApiModuloCliente(IUnitWork pUnitWork)
        {
            unitWork = pUnitWork;
        }

        [HttpGet]
        [Route("getListarTipoClientes/{pAccion:int}")]
        public IActionResult getListarTipoClientes(int pAccion)
        {
            return Ok(unitWork.cliente.getTipoClientes(pAccion));
        }

        [HttpGet]
        [Route("getTipoDocCliente/{pAccion:int}/{pCodTipoCliente:int}")]
        public IActionResult getTipoDocCliente(int pAccion, int pCodTipoCliente)
        {
            return Ok(unitWork.cliente.getTipoDocumentoClientes(pAccion, pCodTipoCliente));
        }

        [HttpGet]
        [Route("getListarClienteAval/{pAccion:int}/{pCodigoCliente:int}/{pDocumentoCliente}/{pNomRazonSocial}")]
        public IActionResult getListarClienteAval(int pAccion, int pCodigoCliente, string pDocumentoCliente, string pNomRazonSocial)
        {
            return Ok(unitWork.cliente.getListarClienteAval(pAccion, pCodigoCliente, pDocumentoCliente, pNomRazonSocial));
        }

        [HttpPost("GestionarClienteCrud")]
        public ActionResult GestionarClienteCrud([FromBody] List<Cliente> clientes )
        {
            try
            {
                object res = unitWork.cliente.GestionarClienteCrud(clientes[0].ACCION, JsonConvert.SerializeObject(clientes).ToString());

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("GestionarClienteCrud", error.Message.ToString(), 0, JsonConvert.SerializeObject(clientes).ToString());

                return Ok("");

            }


        }

        [HttpGet]
        [Route("getGestionarCliente_Consultas/{pAccion:int}/{pCodigoCliente:int}")]
        public IActionResult getGestionarCliente_Consultas(int pAccion, int pCodigoCliente)
        {
            return Ok(unitWork.cliente.getGestionarClientes_Consultas(pAccion, pCodigoCliente));
        }

        [HttpPost("insertseguimientocliente")]
        public ActionResult InsertSeguimientoCliente(ClienteSeguimiento clienteSeguimiento)
        {
            try
            {
                object res = unitWork.cliente.InsertClienteSeguimiento(clienteSeguimiento);

                return Ok(res);
            }
            catch (Exception error)
            {
                unitWork.ilog.RegistrarLogError("InsertSeguimientoCliente", error.Message.ToString(), 0, JsonConvert.SerializeObject(clienteSeguimiento).ToString());

                return Ok("");

            }
        }

        [HttpGet]
        [Route("listarclienteseguimiento/{pAccion:int}/{pCodigoCliente:int}")]
        public IActionResult Listarclienteseguimiento(int pAccion, int pCodigoCliente)
        {
            return Ok(unitWork.cliente.getListarClienteSeguimiento(pAccion, pCodigoCliente));
        }

        [HttpPost]
        [Route("UploadFileliente/{idcliente:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationtoken, int idcliente)
        {
            var result = await WriteFile(file, Convert.ToString(idcliente));
            return Ok(result);
        }

        private async Task<string> WriteFile(IFormFile file, string idcliente)
        {
            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "uploadfile\\cliente\\"+ idcliente);

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "uploadfile\\cliente\\" + idcliente, filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                unitWork.cliente.InsertClienteDocumento(1, Convert.ToInt32( idcliente), 0, file.FileName, filename);
            }
            catch (Exception ex)
            {
                filename = "";
            }
            return filename;
        }

        [HttpGet]
        [Route("DownloadFile/{idcliente}/{filename}")]
        public async Task<IActionResult> DownloadFile(string idcliente, string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "uploadfile\\cliente\\" + idcliente, filename);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }

        [HttpGet]
        [Route("previewFile/{idcliente}/{filename}")]
        public async Task<IActionResult> previewFile(string idcliente, string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "uploadfile\\cliente\\" + idcliente, filename);


            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            byte[] stream = await System.IO.File.ReadAllBytesAsync(filepath);

            return (new FileContentResult(stream,contenttype));
        }

        [HttpGet]
        [Route("listarclientefiles/{pAccion:int}/{pCodigoCliente:int}")]
        public IActionResult Listarclientefiles(int pAccion, int pCodigoCliente)
        {
            return Ok(unitWork.cliente.getListarClienteFiles(pAccion, pCodigoCliente));
        }

        [HttpGet]
        [Route("deletefilecliente/{idcliente}/{idcodidofile}/{filename}")]
        public IActionResult DeleteFileCliente(string idcliente, string idcodidofile, string filename )
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "uploadfile\\cliente\\" + idcliente, filename);


            if (System.IO.File.Exists(filepath))
            {
                try
                {
                    System.IO.File.Delete(filepath);
                    unitWork.cliente.InsertClienteDocumento(2, Convert.ToInt32(idcliente), Convert.ToInt32(idcodidofile), "","");
                }
                catch (Exception e)
                {
                    Console.WriteLine("The deletion failed: {0}", e.Message);
                }
            }

            return Ok();
        }
    }
}
