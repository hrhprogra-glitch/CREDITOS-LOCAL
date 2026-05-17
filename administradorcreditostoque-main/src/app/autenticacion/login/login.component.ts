import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment.prod';
import { GlobalConstants } from 'src/app/global-constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private seguridadServicio: SeguridadService, private router: Router) { }

  ngOnInit(): void {
  }

  onclickAutenticacionUsuario(): void {
    this.seguridadServicio.AutenticacionUsuario(1, (<HTMLInputElement>document.getElementById("txtUsuario")).value, (<HTMLInputElement>document.getElementById("txtPassword")).value).subscribe(resp => {


      if (parseInt(resp[0].Resultado) === 1) {
        console.log(resp[0].JSON_PDATOS[0].AP);
        environment.NOMBRES = resp[0].JSON_PDATOS[0].DP;
        environment.COD_USU = resp[0].JSON_PDATOS[0].CP;
        environment.ALIAS_USU = resp[0].JSON_PDATOS[0].AP;
        environment.EDITAR_OBSERVA_CREDITO = resp[0].JSON_PDATOS[0].EOB;
        environment.EDITAR_MONTO_CREDITO = resp[0].JSON_PDATOS[0].EMC;

        GlobalConstants.vgALIAS_USUARIO = resp[0].JSON_PDATOS[0].AP;
        /*volver a llamar -- para traer toda la configuración global */
        this.seguridadServicio.AutenticacionUsuarioInformacionVariables(2,resp[0].JSON_PDATOS[0].AP,'-').subscribe( resp => {
        });
        this.router.navigate(['/pages/listarcredito']);
      }
      else if (parseInt(resp[0].Resultado) === 0) {
        this.NotificacionGeneral('warning', 'Autenticación de Usuario', resp[0].Mensaje);
      }

    });
  }

  NotificacionGeneral(pIcon: any, pTitle: any, pMensaje: any) {
    Swal.fire({
      icon: pIcon,
      title: pTitle,
      text: pMensaje
    });
  }

}
