import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  ConsultarDataDashboard(pAccion: number = 0, pEstado : number = 0){
    const url = `${base_url}/ModuloDashboard/getConsultarDashboars/${pAccion}/${pEstado}`;
    return this.http.get<any[]>(url);
  }
}
