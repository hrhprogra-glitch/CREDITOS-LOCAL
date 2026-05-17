import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CuadernoCobranza } from '../models/cuadernoCobranza.model';
import { ActualizarCuadernoCobranza } from '../models/actualizarCuadernoCobranza.model';
import { CuadernoCobranzaNotas } from '../models/cuadernoCobranzaNotas.model';
import { ActualizarCuadernoCobranzaDepEfec } from '../models/actualizarCuadernoCobranzaDepositoEfec.model';
import { ActualizarNotasDepEfec } from '../models/actualizarNotaDepEfec.model';

const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class CuadernocobranzaService {

  constructor(private http : HttpClient) { }

  listarCuadernoCobranza(pAccion: number = 0){
    const url = `${base_url}/ModuloCuadernoCobranza/getListarCuadernoCobranza/${pAccion}`;
    return this.http.get<CuadernoCobranza[]>(url);
  }

  ActualizarCuadernoCobranza(objActualizarCuaCo:ActualizarCuadernoCobranza ){
    const url = `${base_url}/ModuloCuadernoCobranza/GestionarCuadernoCobranzaCrud`
    return this.http.post<any>(url, objActualizarCuaCo);
  }
  listarCuadernoCobranzaRangoFecha(pAccion: number = 0, pfechaIni:string = '', pFechaFin:string=''){
    const url = `${base_url}/ModuloCuadernoCobranza/getListarCuadernoCobranzaPorrangoFecha/${pAccion}/${pfechaIni}/${pFechaFin}`;
    return this.http.get<any[]>(url);
  }

  listarCuadernoCobranzaPorCodigocuadernoCobranza(pAccion: number = 0, pCodigoCuadernoCo:number = 0){
    const url = `${base_url}/ModuloCuadernoCobranza/getListarCuadernoCobranzaPorCodigoCuadernoCobranzas/${pAccion}/${pCodigoCuadernoCo}/`;
    return this.http.get<CuadernoCobranza[]>(url);
  }

  ActualizarCuadernoCobranzaNotas(objActualizarNotas:CuadernoCobranzaNotas ){
    const url = `${base_url}/ModuloCuadernoCobranza/GestionarCuadernoActualizarNotas`
    return this.http.post<any>(url, objActualizarNotas);
  }

  ListarNotasListadoCobranza(pAccion: number = 0, pCodigoCuadernoCo:number = 0, pNumDia:number=0){
    const url = `${base_url}/ModuloCuadernoCobranza/getNotasListadoCobranza/${pAccion}/${pCodigoCuadernoCo}/${pNumDia}`;
    return this.http.get<any[]>(url);
  }

  listarCuadernoCobranzaDepositoEfectivo(pAccion: number = 0, pCodigoCuadernoCobranza: number = 0,pCodigoPersonalCobranza:number = 0 ){
    const url = `${base_url}/ModuloCuadernoCobranza/getListarCuadernoCobranzaDE/${pAccion}/${pCodigoCuadernoCobranza}/${pCodigoPersonalCobranza}`;
    return this.http.get<any[]>(url);
  }

  ActualizarCuadernoCobranzaDepoEfec(objActualizarCuaCo:ActualizarCuadernoCobranzaDepEfec ){
    const url = `${base_url}/ModuloCuadernoCobranza/ActualizarCuadernoCobranzaEfectivoDeposito`
    return this.http.post<any>(url, objActualizarCuaCo);
  }

  ActualizarNotasDepoEfec(objActualizarCuaCo:ActualizarNotasDepEfec ){
    const url = `${base_url}/ModuloCuadernoCobranza/ActualizarNotaEfectivoDeposito`
    return this.http.post<any>(url, objActualizarCuaCo);
  }
}
