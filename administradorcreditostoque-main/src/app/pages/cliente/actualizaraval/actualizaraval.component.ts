import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvalService } from 'src/app/services/aval.service';
import { NuevoAval } from '../../../models/nuevoAval.model';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-actualizaraval',
  templateUrl: './actualizaraval.component.html',
  styles: [
  ]
})
export class ActualizaravalComponent implements OnInit {

  public InformacionCliente: NuevoAval[] = [];
  constructor(private avalServicioActualizar: AvalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['idaval'];
    this.getInformacionClientePorCodigo(id);
  }

  getInformacionClientePorCodigo(pCodigoAval: any) {
    this.avalServicioActualizar.ListarAval(2, pCodigoAval).subscribe(resp => {
      this.InformacionCliente = resp;
      return this.InformacionCliente;

    });
  }

  onClickActualizarAval(pCodigoAval:number){
    
    if ((<HTMLInputElement>document.getElementById("txtDocumentoAvalUpd")).value.trim() === ''){
      this.NotificacionGeneral('warning','Actualizar Aval',"No ha ingresado el número de documento del Aval");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtNombresAvalUpd")).value.trim() === ''){
      this.NotificacionGeneral('warning','Actualizar Aval',"No ha ingresado el número de documento del Aval");
      return;
    }
    let nuevoCliente: NuevoAval[]=[{
      ACCION:2,
      CODIGO_AVAL:pCodigoAval,
      DOCUMENTO_AVAL:(<HTMLInputElement>document.getElementById("txtDocumentoAvalUpd")).value.trim(),
      NOMBRES_AVAL:(<HTMLInputElement>document.getElementById("txtNombresAvalUpd")).value.trim(),
      TELEFONO_AVAL:(<HTMLInputElement>document.getElementById("txtTelefonoAvalUpd")).value.trim(),
      CORREO_AVAL:(<HTMLInputElement>document.getElementById("txtCorreoAvalUpd")).value.trim(),
      DIRECCION_AVAL:(<HTMLInputElement>document.getElementById("txtDireccionAvalUpd")).value.trim()
    }]

    this.avalServicioActualizar.RegistrarActualizarNuevoAval(nuevoCliente).subscribe( resp => {
      if (parseInt(resp[0].RE) ===1){
        this.router.navigate(['/pages/listaraval']);
      }
      else if (parseInt(resp[0].RE) ===0){
        this.NotificacionGeneral('warning','Actualizar Aval',resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error','Actualizar Aval',"Ocurrio un inconveniente al registrar los datos del Aval");
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
