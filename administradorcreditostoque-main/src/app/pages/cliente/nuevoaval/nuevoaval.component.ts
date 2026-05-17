import { Component, OnInit } from '@angular/core';
import { AvalService } from 'src/app/services/aval.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { NuevoAval } from '../../../models/nuevoAval.model';
@Component({
  selector: 'app-nuevoaval',
  templateUrl: './nuevoaval.component.html',
  styles: [
  ]
})
export class NuevoavalComponent implements OnInit {

  constructor(private avalServicio: AvalService,private router:Router) { }

  ngOnInit(): void {
  }

  onClickGrabarAval(){
    
    if ((<HTMLInputElement>document.getElementById("txtDocumentoAval")).value.trim() === ''){
      this.NotificacionGeneral('warning','Nuevo Aval',"No ha ingresado el número de documento del Aval");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtNombresAval")).value.trim() === ''){
      this.NotificacionGeneral('warning','Nuevo Aval',"No ha ingresado el número de documento del Aval");
      return;
    }
    let nuevoCliente: NuevoAval[]=[{
      ACCION:1,
      CODIGO_AVAL:0,
      DOCUMENTO_AVAL:(<HTMLInputElement>document.getElementById("txtDocumentoAval")).value.trim(),
      NOMBRES_AVAL:(<HTMLInputElement>document.getElementById("txtNombresAval")).value.trim(),
      TELEFONO_AVAL:(<HTMLInputElement>document.getElementById("txtTelefonoAval")).value.trim(),
      CORREO_AVAL:(<HTMLInputElement>document.getElementById("txtCorreoAval")).value.trim(),
      DIRECCION_AVAL:(<HTMLInputElement>document.getElementById("txtDireccionAval")).value.trim()
    }]


    this.avalServicio.RegistrarActualizarNuevoAval(nuevoCliente).subscribe( resp => {
      if (parseInt(resp[0].RE) ===1){
        this.router.navigate(['/pages/listaraval']);
      }
      else if (parseInt(resp[0].RE) ===0){
        this.NotificacionGeneral('warning','Nuevo Aval',resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error','Nuevo Aval',"Ocurrio un inconveniente al registrar los datos del Aval");
      }
    });

  }

  NotificacionGeneral(pIcon:any, pTitle:any, pMensaje:any) {
    Swal.fire({
        icon: pIcon,
        title: pTitle,
        text: pMensaje
    });
  }
}
