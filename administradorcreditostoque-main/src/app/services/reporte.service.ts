import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';

const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http : HttpClient) { }

  ConsultarCreditossegunformaentregaxfecha(pAccion: number = 0, pFchaini:string, pFechaFin:string){
    const url = `${base_url}/ModuloReporte/getcreditossegunformaentregaxfecha/${pAccion}/${pFchaini}/${pFechaFin}`;
    return this.http.get<any[]>(url);
  }
}
