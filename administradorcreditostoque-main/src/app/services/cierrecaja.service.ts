import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CierreCajaSaldos } from '../models/cierrecajasaldos.model';
import { CierreCajaUtilidad } from '../models/cierreUtilidad.model';
import { CierreDiario } from '../models/cierreDiario.model';

const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class CierrecajaService {

  constructor(private http: HttpClient) { }

  ListarCierreCajaSaldos(pAccion: number = 0, pFechaIni : string = '', pFechaFin: string = ''){
    const url = `${base_url}/ModuloCierreCaja/getCierreCajaSaldos/${pAccion}/${pFechaIni}/${pFechaFin}`;
    return this.http.get<any[]>(url);
  }


  CerrarCierreCaja(objCierreCaja:CierreCajaSaldos ){
    const url = `${base_url}/ModuloCierreCaja/CerrarCierreCajasSaldos`
    return this.http.post<any>(url, objCierreCaja);
  }

  ListarCierreUtilidad(pAccion: number = 0, pFechaIni : string = '', pFechaFin: string = ''){
    const url = `${base_url}/ModuloCierreCaja/getCierreCajaUtilidad/${pAccion}/${pFechaIni}/${pFechaFin}`;
    return this.http.get<any[]>(url);
  }

  CerrarCierreCajaUtilidad(objCierreCaja:CierreCajaUtilidad ){
    const url = `${base_url}/ModuloCierreCaja/CerrarCierreCajasUtilidad`
    return this.http.post<any>(url, objCierreCaja);
  }

  Listarresumenpagossegunlistacobranza(pAccion: number = 0, pFechacierre : string = ''){
    const url = `${base_url}/ModuloCierreCaja/getResumenpagossegunlistacobranza/${pAccion}/${pFechacierre}`;
    return this.http.get<any[]>(url);
  }

  CerrarCajaDiario(objCierrediario:CierreDiario ){
    const url = `${base_url}/ModuloCierreCaja/RegistrarCierrecajaDiario`
    return this.http.post<any>(url, objCierrediario);
  }

  ListarCierrecajaDiario(pAccion: number = 0, pCodigo : number = 0){
    const url = `${base_url}/ModuloCierreCaja/listarcierrediariocaja/${pAccion}/${pCodigo}`;
    return this.http.get<any[]>(url);
  }
}
