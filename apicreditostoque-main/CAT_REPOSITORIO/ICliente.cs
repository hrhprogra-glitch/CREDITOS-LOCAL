using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using CAT_MODELOS;

namespace CAT_REPOSITORIO
{
    public interface ICliente
    {
        object getTipoClientes(int pAccion);
        object getTipoDocumentoClientes(int pAccion, int pTipoCliente);

        object getListarClienteAval(int pAccion, int pCodigoCliente, string pDocumentoCliente, string pNomRazonSocial);

        object GestionarClienteCrud(int pAccion, string JsonCliente);

        object getGestionarClientes_Consultas(int pAccion, int pCodigoCliente);
        object InsertClienteSeguimiento(ClienteSeguimiento clienteSeguimiento);
        object getListarClienteSeguimiento(int pAccion, int pCodigoCliente);
        object InsertClienteDocumento(int pAccion, int pCodCli, int pCodcliFile, string pNamearchivoOri, string pNamearchivoSer);
        object getListarClienteFiles(int pAccion, int pCodigoCliente);
    }
}
