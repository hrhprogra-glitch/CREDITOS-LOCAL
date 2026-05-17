import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const base_url = environment.ULR_API;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public menu: any = [];

  constructor(private http: HttpClient) { }
  AutenticacionUsuario(pAccion: number = 0, pUsuario: string = "", pPassword: string = '') {
    const url = `${base_url}/ModuloSeguridad/getAutenticacionUsuario/${pAccion}/${pUsuario}/${pPassword}`;
    return this.http.get<any>(url)
  }

  AutenticacionUsuarioInformacionVariables(pAccion: number = 0, pUsuario: string = "", pPassword: string = '') {
    const url = `${base_url}/ModuloSeguridad/getAutenticacionUsuario/${pAccion}/${pUsuario}/${pPassword}`;
    return this.http.get<any>(url).pipe(
      map((resp: any) => {
        localStorage.setItem('menu', JSON.stringify(resp));
        this.cargarMenu();
        return resp;
      }),
      catchError(error => of(false))
    );
  }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '[]');
  }
}
