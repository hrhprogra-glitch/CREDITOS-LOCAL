import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../services/seguridad.service';
import { environment } from '../../environments/environment.prod';
import { GlobalConstants } from '../global-constantes';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  public listaAccesos :any [] = [];
  constructor(private seguridadServicio: SeguridadService) { }

  ngOnInit(): void {   
   
    this.seguridadServicio.cargarMenu();
    GlobalConstants.vgALIAS_USUARIO = this.seguridadServicio.menu[0].AP;

    //this.CargarConfiguracionAccesos();
  }
  CargarConfiguracionAccesos(): void{
    this.seguridadServicio.AutenticacionUsuarioInformacionVariables(2,GlobalConstants.vgALIAS_USUARIO,'-').subscribe( resp => {
      this.listaAccesos = resp;
    });
  }
}
