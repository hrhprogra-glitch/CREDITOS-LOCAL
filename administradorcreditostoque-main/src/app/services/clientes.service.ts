import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoCliente } from '../models/tipocliente.model';
import { TipoDocumentoCliente } from '../models/tipodoccliente.model';
import { ClienteAval } from '../models/clienteaval.model';
import { NuevoCliente } from '../models/nuevocliente.model';
import { ConsultaCliente } from '../models/clienteConsulta.model';
import { ConsultarCreditosporcliente } from '../models/consultarCreditoporcliente.model';
import { ConsultarClientePorCodigo } from '../models/consultarClienteporcodigo.model';

import { environment } from 'src/environments/environment';
import { ClienteSeguimiento } from '../models/clienteSeguimiento.model';

const base_url = environment.ULR_API;
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  ListarTipoCliente(pAccion: number = 0){
    const url = `${base_url}/ModuloClientes/getListarTipoClientes/${pAccion}`;
    return this.http.get<TipoCliente[]>(url);
  }

  listarTipoDocumentosClientes(pAccion: number = 0,pTipoCliente: number = 0){
    const url = `${base_url}/ModuloClientes/getTipoDocCliente/${pAccion}/${pTipoCliente}`;
    return this.http.get<TipoDocumentoCliente[]>(url);
  }

  listarClienteAval(pAccion: number = 0,pCodigoCliente: number = 0, pDocumentoCliente : string = '-', pNomRazonSo : string = '-'){
    const url = `${base_url}/ModuloClientes/getListarClienteAval/${pAccion}/${pCodigoCliente}/${pDocumentoCliente}/${pNomRazonSo}`;
    return this.http.get<ClienteAval[]>(url);
  }

  RegistrarActualizarNuevoCliente(objCliente:NuevoCliente []){
    const url = `${base_url}/ModuloClientes/GestionarClienteCrud`
    return this.http.post<any>(url, objCliente);
  }

  getGestionarClienteConsultas(pAccion: number = 0,pCodigoCliente: number = 0){
    const url = `${base_url}/ModuloClientes/getGestionarCliente_Consultas/${pAccion}/${pCodigoCliente}`;
    return this.http.get<ConsultaCliente[]>(url);
  }

  getConsultarCreditosPorCliente(pAccion: number = 0,pCodigoCredito: number = 0, pCodigoCliente: number=0){
    const url = `${base_url}/ModuloCreditos/getGestionarCreditos_Consultas/${pAccion}/${pCodigoCredito}/${pCodigoCliente}`;
    return this.http.get<ConsultarCreditosporcliente[]>(url);
  }

  getGestionarInformacionClientePorCodigo(pAccion: number = 0,pCodigoCliente: number = 0){
    const url = `${base_url}/ModuloClientes/getGestionarCliente_Consultas/${pAccion}/${pCodigoCliente}`;
    return this.http.get<ConsultarClientePorCodigo[]>(url);
  }

  InsertSeguimiento(objCliente:ClienteSeguimiento ){
    const url = `${base_url}/ModuloClientes/insertseguimientocliente`
    return this.http.post<any>(url, objCliente);
  }

  getListarClienteseguimiento(pAccion : number, pCodigocliente:number){
    const url = `${base_url}/ModuloClientes/listarclienteseguimiento/${pAccion}/${pCodigocliente}`;
    return this.http.get<any[]>(url);
  }

  async subirarchivofile(
    archivo: File,
    idcliente: string
  ) 
  {

    try {

      const url = `${base_url}/ModuloClientes/UploadFileliente/${idcliente}`;
      const formData = new FormData();
      formData.append('file', archivo);

      const resp = await fetch(url, {
        method: 'POST',
        body: formData
      });

      const data = await resp.json();

      return data;

    } 
    catch (error) {
      console.log(error);
      return false;
    }

  }

  getListarClienteFiles(pAccion : number, pCodigocliente:number){
    const url = `${base_url}/ModuloClientes/listarclientefiles/${pAccion}/${pCodigocliente}`;
    return this.http.get<any[]>(url);
  }

  EliminarFile(pCodclie : string, pcodfile:string, pnamefile:string){
    const url = `${base_url}/ModuloClientes/deletefilecliente/${pCodclie}/${pcodfile}/${pnamefile}`;
    return this.http.get<any[]>(url);
  }
}
