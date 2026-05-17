import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteAval } from '../models/clienteaval.model';
import { TipoCredito } from '../models/tipoCredito.model';
import { CalcularCronograma } from '../models/calcularCronograma.model';
import { CronogramaPagos } from '../models/cronogramaPagos.model';
import { Credito } from '../models/credito.model';
import { ConsultarCreditos } from '../models/consultarCredito.model';
import { ConsultarCreditosporcodigo } from '../models/consultarCreditoporcodigo.model';
import { ActualizarMontoCredito } from '../models/actualizarMontocredito.model';
import { environment } from 'src/environments/environment';
import { cuadernoCobranzaHistorial } from '../models/cuadernoCibranzaHistorial.model';
import { ActualizarObservacionesCredito } from '../models/actualizarObservacionesCredito.model';
import { ActualizarCreditoCliente } from '../models/actualizarcreditocliente.model';
import { CreditoFormaEntregaupd } from '../models/creditoFormaEntregaupd.model';

const base_url = environment.ULR_API;
@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  constructor(private http : HttpClient) { }

  listarClienteCre(pAccion: number = 0,pCodigoCliente: number = 0, pDocumentoCliente : string = '-', pNomRazonSo : string = '-'){
    const url = `${base_url}/ModuloClientes/getListarClienteAval/${pAccion}/${pCodigoCliente}/${pDocumentoCliente}/${pNomRazonSo}`;
    return this.http.get<ClienteAval[]>(url);
  }

  ListarTipoCredito(pAccion: number = 0){
    const url = `${base_url}/ModuloCreditos/getListarTipoCreditos/${pAccion}`;
    return this.http.get<TipoCredito[]>(url);
  }

  CalcularCronogramaPagosCredito(objCliente:CalcularCronograma ){
    const url = `${base_url}/ModuloCreditos/CalcularCronogramaPagos`
    return this.http.post<CronogramaPagos[]>(url, objCliente);
  }

  RegistrarCreditos(objCliente:Credito[] ){
    const url = `${base_url}/ModuloCreditos/GestionarCreditosCrud`
    return this.http.post<any>(url, objCliente);
  }

  getConsultarCreditos(pAccion: number = 0,pCodigoCredito: number = 0, pCodigoCliente: number=0){
    const url = `${base_url}/ModuloCreditos/getGestionarCreditos_Consultas/${pAccion}/${pCodigoCredito}/${pCodigoCliente}`;
    return this.http.get<ConsultarCreditos[]>(url);
  }

  getConsultarCreditosPorCodigo(pAccion: number = 0,pCodigoCredito: number = 0, pCodigoCliente: number=0){
    const url = `${base_url}/ModuloCreditos/getGestionarCreditos_Consultas/${pAccion}/${pCodigoCredito}/${pCodigoCliente}`;
    return this.http.get<ConsultarCreditosporcodigo[]>(url);
  }

  ActualizarCreditoCuota(objCredito:ActualizarMontoCredito[] ){
    const url = `${base_url}/ModuloCreditos/GestionarCreditosCrudActualizarCuoata`
    return this.http.post<any>(url, objCredito);
  }

  getConsultarCreditosPorCodigoHistoral(pAccion: number = 0,pCodigoCredito: number = 0, pCodigoCliente: number=0){
    const url = `${base_url}/ModuloCreditos/getGestionarCreditos_Consultas/${pAccion}/${pCodigoCredito}/${pCodigoCliente}`;
    return this.http.get<cuadernoCobranzaHistorial[]>(url);
  }

  getConsultarCreditosPorCodigoActaulizar(pAccion: number = 0,pCodigoCredito: number = 0, pCodigoCliente: number=0){
    const url = `${base_url}/ModuloCreditos/getGestionarCreditos_Consultas/${pAccion}/${pCodigoCredito}/${pCodigoCliente}`;
    return this.http.get<ActualizarCreditoCliente[]>(url);
  }

  ActaulizarObservacionesCronoDeta(objActua : ActualizarObservacionesCredito){
    const url = `${base_url}/ModuloCreditos/GestionarCreditoActualizarObservaciones`
    return this.http.post<any>(url, objActua);
  }

  ActualizarFechasPendientesCreditos(){
    const url = `${base_url}/ModuloCreditos/ActualizarFechasPendientesCreditos`;
    return this.http.get<any>(url);
  }

  ActualizarFechasPendientesCreditosPorCredito(pCodigoCredito: number = 0){
    const url = `${base_url}/ModuloCreditos/ActualizarFechasPendientesCreditosPorCredito/${pCodigoCredito}`;
    return this.http.get<any>(url);
  }
  getListarClientesAll(){
    const url = `${base_url}/ModuloCreditos/getListarClienresAll`;
    return this.http.get<any[]>(url);
  }

  getConsultarCreditosPorFechaCliente(pCodigoCliente: number = 0, pFechaIni: string = "", pFechaFin: string = ""){
    const url = `${base_url}/ModuloCreditos/getCreditosPorFechaClienteCod/${pCodigoCliente}/${pFechaIni}/${pFechaFin}`;
    return this.http.get<ConsultarCreditos[]>(url);
  }

  ListarPersonalCobranza(pAccion: number = 0){
    const url = `${base_url}/ModuloCreditos/getPersonalCobranzas/${pAccion}`;
    return this.http.get<any[]>(url);
  }

  InsertarEliminarformaentrega(objActua : CreditoFormaEntregaupd){
    const url = `${base_url}/ModuloCreditos/inserteliminarformaentregacredito`
    return this.http.post<any>(url, objActua);
  }

  Listarformaentrega(pAccion: number, pCodcre:number){
    const url = `${base_url}/ModuloCreditos/getlistarformaentregacredito/${pAccion}/${pCodcre}`;
    return this.http.get<any[]>(url);
  }
}
