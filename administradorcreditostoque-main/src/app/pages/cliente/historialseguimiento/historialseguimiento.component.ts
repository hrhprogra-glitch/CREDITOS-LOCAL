import { Component , ViewChild,Input} from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { GlobalConstants } from 'src/app/global-constantes';
import { ClienteSeguimiento } from 'src/app/models/clienteSeguimiento.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { SeguridadService } from 'src/app/services/seguridad.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-historialseguimiento',
  templateUrl: './historialseguimiento.component.html',
  styleUrls: ['./historialseguimiento.component.css']
})
export class HistorialseguimientoComponent {

  public Editor :any = ClassicEditorBuild;
  public EditorData: any = ``;
  public listarSeguimiento: any[] = [];
  @ViewChild('Notascliente') Notascliente: any;
  @Input() vCodigoCliente :number = 0;

  @Input() vListarSeguimiento: any[] = [];

  public config = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize',
      'alignment',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'custombutton', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeBlock', '|',
      'insertTable', '|',
      'undo', 'redo', '|',
      'youtube'
    ]
  }

  constructor(private clienteService: ClientesService, private servicioSeguridad:SeguridadService) { }

  onClickRegistrarSeguimiento(){

    this.servicioSeguridad.cargarMenu()
    let nuevoSeguimiento: ClienteSeguimiento={
      ACCION:1,
      CODIGO_CLIENTE_S:0,
      CODIGO_CLIENTE:this.vCodigoCliente,
      NOTAS_S:this.Notascliente.editorInstance.getData(),
      USUARIO_S: this.servicioSeguridad.menu[0].AP
    }

    this.clienteService.InsertSeguimiento(nuevoSeguimiento).subscribe( resp => {
      if (parseInt(resp[0].RE) ===1){
        this.NotificacionGeneral('success','Seguimiento Cliente',resp[0].ME);
        this.getClienteSeguimiento();
        this.Notascliente.editorInstance.setData("");
      }
      else if (parseInt(resp[0].RE) ===0){
        this.NotificacionGeneral('warning','Seguimiento Cliente',resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error','Seguimiento Cliente',"Ocurrio un inconveniente al registrar los datos del seguimiento");
      }
    });
  }

  onClickEliminarSeguimiento(pCodigoSe:number){
    let nuevoSeguimiento: ClienteSeguimiento={
      ACCION:2,
      CODIGO_CLIENTE_S:pCodigoSe,
      CODIGO_CLIENTE:this.vCodigoCliente,
      NOTAS_S:"",
      USUARIO_S:""
    }

    this.NotificacionPregunta('question','Seguimiento Cliente','¿Estas seguro de eliminar el seguimiento?','',nuevoSeguimiento);
  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pObjArray: ClienteSeguimiento) {
    Swal.fire({
      title: pTitle,
      text: pMensaje,
      icon: pIcon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.InsertSeguimiento(pObjArray).subscribe( resp => {
          if (parseInt(resp[0].RE) ===1){
            this.NotificacionGeneral('success','Seguimiento Cliente',resp[0].ME);
            this.getClienteSeguimiento();
          }
          else if (parseInt(resp[0].RE) ===0){
            this.NotificacionGeneral('warning','Seguimiento Cliente',resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error','Seguimiento Cliente',"Ocurrio un inconveniente al eliminar los datos del seguimiento");
          }
        });
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

  getClienteSeguimiento(): void {

    this.clienteService.getListarClienteseguimiento(1, this.vCodigoCliente).subscribe(resp => {
      this.vListarSeguimiento = resp;
    });
  }
}
