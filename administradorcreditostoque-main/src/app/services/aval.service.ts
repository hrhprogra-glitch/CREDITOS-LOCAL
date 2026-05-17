import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { NuevoAval } from '../models/nuevoAval.model';

const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class AvalService {

  constructor(private http: HttpClient) { }
  RegistrarActualizarNuevoAval(objAval:NuevoAval []){
    const url = `${base_url}/ModuloAval/GestionarAvalCrud`
    return this.http.post<any>(url, objAval);
  }

  ListarAval(pAccion: number = 0, pCodigoAval:number=0){
    const url = `${base_url}/ModuloAval/getListarAval/${pAccion}/${pCodigoAval}`;
    return this.http.get<NuevoAval[]>(url);
  }
}
