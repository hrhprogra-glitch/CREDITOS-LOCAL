import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TipoCliente } from '../../../models/tipocliente.model';
import { TipoDocumentoCliente } from '../../../models/tipodoccliente.model';
import { ClienteAval } from '../../../models/clienteaval.model';
import { ClientesService } from '../../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultarClientePorCodigo } from '../../../models/consultarClienteporcodigo.model';
import { NuevoCliente } from '../../../models/nuevocliente.model';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2'
declare const $: any;
const base_url = environment.ULR_API;
@Component({
  selector: 'app-actualizacliente',
  templateUrl: './actualizacliente.component.html',
  styles: [
  ]
})
export class ActualizaclienteComponent implements OnInit {

  public listarTipoClienteUpd: TipoCliente[] = [];
  public listarTipoDocClienteUpd: TipoDocumentoCliente[] = [];
  public listarClienteAvalUpd: ClienteAval[] = [];
  public listarInformacionCliente: ConsultarClientePorCodigo = new ConsultarClientePorCodigo()
  public listarfiles: any[] = [];
  @ViewChild('cerrarModalUpd') cerrarModalUpd!: ElementRef;

  public CodTipoCliente: number = 0;
  public CodTipoDoc: number = 0
  public imagenSubir!: File;
  public vUrlfile:string = base_url+"/ModuloClientes/";

  constructor(private clienteServiceUpd: ClientesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ListarTipoClienteUpd();
    const id = this.route.snapshot.params['idcliente'];
    this.getInformacionClientePorCodigo(id);
    this.ListarFiles(id);
  }

  ListarTipoClienteUpd() {
    this.clienteServiceUpd.ListarTipoCliente(1).subscribe(resp => {
      this.listarTipoClienteUpd = resp;
      return this.listarTipoClienteUpd;
    });
  }

  SeleccionarTipoCliente(pPerRaso: number, pPerNoma: number) {

    let txtRazonSocial = document.getElementById('divRasonSocialUpd')!
    let txtNombresApellidos = document.getElementById('divNombresApellidosUpd')!

    if (pPerRaso == 1) {
      txtRazonSocial.className = 'col-md-6 sinone'
    }
    else {
      txtRazonSocial.className = 'col-md-6 nonone'
    }

    if (pPerNoma == 1) {
      txtNombresApellidos.className = 'col-md-6 sinone'
    }
    else {
      txtNombresApellidos.className = 'col-md-6 nonone'
    }


  }

  ListarTipoDocumentos(pTipoCliente: any) {
    this.clienteServiceUpd.listarTipoDocumentosClientes(2, pTipoCliente).subscribe(resp => {
      this.listarTipoDocClienteUpd = resp;
      return this.listarTipoDocClienteUpd;
    });
  }

  OnClickBuscarListarClienteAvalUpd(pCodigoCliente: string, pDocCliente: string, pNombRazonsocial: string) {
    if (pCodigoCliente == '') {
      pCodigoCliente = '0';
    }
    if (pDocCliente == '') {
      pDocCliente = '-';
    }
    if (pNombRazonsocial == '') {
      pNombRazonsocial = '-';
    }
    this.ListarClienteAvalUpd(pCodigoCliente, pDocCliente, pNombRazonsocial);
  }
  ListarClienteAvalUpd(pCodigoCliente: any, pDocumentoCliente: any, pNomRazonSo: any) {
    this.clienteServiceUpd.listarClienteAval(0, pCodigoCliente, pDocumentoCliente, pNomRazonSo).subscribe(resp => {
      this.listarClienteAvalUpd = resp;
      return this.listarClienteAvalUpd;
    });
  }

  SeleccionarClienteAvalUpd(pClienteAval: any) {
    const selectAval = pClienteAval.target;
    (<HTMLInputElement>document.getElementById("spanCodigoClienteUpd")).textContent = selectAval.getAttribute('data-codcli');
    (<HTMLInputElement>document.getElementById("spanNomrsClienteUpd")).textContent = selectAval.getAttribute('data-nomrs');
    (<HTMLInputElement>document.getElementById("spanDirClienteUpd")).textContent = selectAval.getAttribute('data-dirc');
    this.cerrarModalUpd.nativeElement.click();
  }

  getInformacionClientePorCodigo(pCodigoCliente: any) {
    this.clienteServiceUpd.getGestionarInformacionClientePorCodigo(2, pCodigoCliente).subscribe(resp => {
      this.listarInformacionCliente = resp[0];
      this.ListarTipoDocumentos(this.listarInformacionCliente.CODTC);
      this.CodTipoCliente = this.listarInformacionCliente.CODTC;
      this.CodTipoDoc = this.listarInformacionCliente.CODTDCLI;
      this.SeleccionarTipoCliente(this.listarInformacionCliente.PRS, this.listarInformacionCliente.PMA);
      return this.listarInformacionCliente;

    });
  }

  onClickGrabarClienteUpd(pCodCliente: any) {
    let vCodigoAval : number = 0;
    if (parseInt((<HTMLInputElement>document.getElementById("cboTipoClienteUpd")).value) === 0) {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "No ha seleccionado tipo de cliente");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cboTipoDocuClienteUpd")).value) === 0) {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "No ha seleccionado tipo de documento para el cliente");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtDNIClienteUpd")).value.trim() === '') {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "No ha ingresado el número de documento para el cliente");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtDNIClienteUpd")).value.length < parseInt($('#cboTipoDocuClienteUpd').find('option:selected').attr('data-ltdc')) || (<HTMLInputElement>document.getElementById("txtDNIClienteUpd")).value.length > parseInt($('#cboTipoDocuClienteUpd').find('option:selected').attr('data-ltdc'))) {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "La longitud de carácteres del documento del cliente es incorrecta");
      return;
    }
    else if (parseInt($('#cboTipoClienteUpd').find('option:selected').attr('data-prs')) === 1 && (<HTMLInputElement>document.getElementById("txtRasonSocialCliUpd")).value.trim() == '') {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "No ha ingresaro razón social para el cliente");
      return;
    }
    else if (parseInt($('#cboTipoClienteUpd').find('option:selected').attr('data-pna')) === 1 && (<HTMLInputElement>document.getElementById("txtNombresApeCliUpd")).value.trim() == '') {
      this.NotificacionGeneral('warning', 'Nuevo Cliente', "No ha ingresado nombres para el cliente");
      return;
    }
    
    if ((<HTMLInputElement>document.getElementById("spanCodigoClienteUpd")).textContent === ' - '){
      vCodigoAval = 0;
    }
    else {
      vCodigoAval =parseInt((<HTMLInputElement>document.getElementById("spanCodigoClienteUpd")).textContent!);
    }

    var element = <HTMLInputElement> document.getElementById("cbClienteMoroso");

    const selectCli = pCodCliente.target;
    let nuevoCliente: NuevoCliente[] = [{
      ACCION: 2,
      CODIGO_CLIENTE: selectCli.getAttribute('data-codcli'),
      NOMBRES_CLIENTE: (<HTMLInputElement>document.getElementById("txtNombresApeCliUpd")).value.trim(),
      CONYUGE_CLIENTE: (<HTMLInputElement>document.getElementById("txtDatosConyugeUpd")).value.trim(),
      DIRECCION_CLIENTE: (<HTMLInputElement>document.getElementById("txtDireccionUpd")).value.trim(),
      TELEFONO1_CLIENTE: (<HTMLInputElement>document.getElementById("txtTelefono1Upd")).value.trim(),
      TELEFONO2_CLIENTE: (<HTMLInputElement>document.getElementById("txtTelefono2Upd")).value.trim(),
      AVAL_CLIENTE: vCodigoAval,
      CORREO_CLIENTE: (<HTMLInputElement>document.getElementById("txtCorreoElecUpd")).value.trim(),
      CREAUSU_CLIENTE: 2,
      CODIGO_TIPOLI: parseInt((<HTMLInputElement>document.getElementById("cboTipoClienteUpd")).value),
      RAZONSOCIAL_CLIENTE: (<HTMLInputElement>document.getElementById("txtRasonSocialCliUpd")).value.trim(),
      CODIGO_TIPODOCLI: parseInt((<HTMLInputElement>document.getElementById("cboTipoDocuClienteUpd")).value),
      DOCUMENTO_CLIENTE: (<HTMLInputElement>document.getElementById("txtDNIClienteUpd")).value.trim(),
      MOROSO_CLIENTE: element.checked === true ?1:0
    }]

    this.clienteServiceUpd.RegistrarActualizarNuevoCliente(nuevoCliente).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.router.navigate(['/pages/listarcliente']);
      }
      else if (parseInt(resp[0].RE) === 0) {
        this.NotificacionGeneral('warning', 'Actualizar Cliente', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Actualizar Cliente', "Ocurrio un inconveniente al actualizar al actualizar los datos del cliente");
      }
    });

  }

  cargarImagen(event: any) {
    console.log(event)
    this.imagenSubir = event.target.files[0];

  }

  ListarFiles(pCodigoCliente:number){

    this.clienteServiceUpd.getListarClienteFiles(1, pCodigoCliente).subscribe(resp => {
      this.listarfiles = resp;
    });
  }

  EliminarFile(pCodigoCliente:number, pCodFile:number, pNamefile:string, pNameOr:string){

    this.NotificacionPreguntaEliminar('question','Eliminar Archivo','¿Estas seguro de eliminar el archico "'+pNameOr+'"?','', pCodigoCliente, pCodFile, pNamefile);
  }

  onClickGuardarFile(pIdCliente:number){
    this.NotificacionPregunta('question','Guardar Archivo','¿Estas seguro de guardar el archivo?','', pIdCliente.toString());
  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, idcliente: string) {
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

        this.clienteServiceUpd.subirarchivofile(this.imagenSubir, idcliente).then(res => {
          this.ListarFiles(parseInt(idcliente) );
        }).catch(err => {
          console.log(err)
        })
      }
    });
  }

  NotificacionPreguntaEliminar(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pCodigoCliente:number, pCodFile:number, pNamefile:string) {
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

        this.clienteServiceUpd.EliminarFile(pCodigoCliente.toString(), pCodFile.toString(), pNamefile).subscribe(resp => {
          this.ListarFiles(pCodigoCliente);
        });
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
