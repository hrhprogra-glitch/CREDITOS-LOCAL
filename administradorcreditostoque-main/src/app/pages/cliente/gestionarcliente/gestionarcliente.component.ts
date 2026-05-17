import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TipoCliente } from '../../../models/tipocliente.model';
import { ClientesService } from '../../../services/clientes.service';
import { TipoDocumentoCliente } from '../../../models/tipodoccliente.model';
import { ClienteAval } from '../../../models/clienteaval.model';
import { NuevoCliente } from '../../../models/nuevocliente.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
declare const $:any;
@Component({
  selector: 'app-gestionarcliente',
  templateUrl: './gestionarcliente.component.html',
  styles: [
  ]
})

export class GestionarclienteComponent implements OnInit {

  public listarTipoCliente : TipoCliente[]=[];
  public listarTipoDocCliente : TipoDocumentoCliente[]=[];
  public listarClienteAval : ClienteAval[]=[];
  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  
  txtDNICliente: string ='';
  constructor( private clienteService: ClientesService,private router:Router) { }

  ngOnInit(): void {
    this.ListarTipoCliente();
  }

  ListarTipoCliente()  {
    this.clienteService.ListarTipoCliente(1).subscribe( resp => {
      console.log(resp);
      this.listarTipoCliente = resp;
      return this.listarTipoCliente;
    });
  }

  SeleccionarTipoCliente (pTipoCliente:any){
    const selectEl = pTipoCliente.target;

    let txtRazonSocial = document.getElementById('divRasonSocial')!
    let txtNombresApellidos = document.getElementById('divNombresApellidos')!

    if (selectEl.options[selectEl.selectedIndex].getAttribute('data-prs') == 1){
      txtRazonSocial.className = 'col-md-6 sinone'
    }
    else {
      txtRazonSocial.className = 'col-md-6 nonone'
    }

    if (selectEl.options[selectEl.selectedIndex].getAttribute('data-pna')== 1){
      txtNombresApellidos.className = 'col-md-6 sinone'
    }
    else {
      txtNombresApellidos.className = 'col-md-6 nonone'
    }

    this.ListarTipoDocumentos(pTipoCliente.target.value);
  }

  ListarTipoDocumentos(pTipoCliente:any)  {
    this.clienteService.listarTipoDocumentosClientes(2,pTipoCliente).subscribe( resp => {
      this.listarTipoDocCliente = resp;
      return this.listarTipoDocCliente;
    });
  }

  OnClickBuscarListarClienteAval(pCodigoCliente:string, pDocCliente:string, pNombRazonsocial:string){
    if (pCodigoCliente == ''){
      pCodigoCliente = '0';
    }
    if (pDocCliente == ''){
      pDocCliente = '-';
    }
    if (pNombRazonsocial == ''){
      pNombRazonsocial = '-';
    }
    this.ListarClienteAval(pCodigoCliente,pDocCliente,pNombRazonsocial);
  }
  ListarClienteAval(pCodigoCliente:any, pDocumentoCliente:any, pNomRazonSo:any)  {
    this.clienteService.listarClienteAval(0,pCodigoCliente,pDocumentoCliente,pNomRazonSo).subscribe( resp => {
      this.listarClienteAval = resp;
      return this.listarClienteAval;
    });
  }

  SeleccionarClienteAval(pClienteAval:any){
    const selectAval = pClienteAval.target;
    (<HTMLInputElement>document.getElementById("spanCodigoCliente")).textContent = selectAval.getAttribute('data-codcli');
    (<HTMLInputElement>document.getElementById("spanNomrsCliente")).textContent = selectAval.getAttribute('data-nomrs');
    (<HTMLInputElement>document.getElementById("spanDirCliente")).textContent =  selectAval.getAttribute('data-dirc');
    this.cerrarModal.nativeElement.click();
  }

  onClickGrabarCliente(){
    let vCodigoAval : number = 0;
    if (parseInt((<HTMLInputElement>document.getElementById("cboTipoCliente")).value) === 0){
      this.NotificacionGeneral('warning','Nuevo Cliente',"No ha seleccionado tipo de cliente");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cboTipoDocuCliente")).value) === 0){
      this.NotificacionGeneral('warning','Nuevo Cliente',"No ha seleccionado tipo de documento para el cliente");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtDNICliente")).value.trim() === ''){
      this.NotificacionGeneral('warning','Nuevo Cliente',"No ha ingresado el número de documento para el cliente");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtDNICliente")).value.length < parseInt($('#cboTipoDocuCliente').find('option:selected').attr('data-ltdc')) || (<HTMLInputElement>document.getElementById("txtDNICliente")).value.length > parseInt($('#cboTipoDocuCliente').find('option:selected').attr('data-ltdc'))){
      this.NotificacionGeneral('warning','Nuevo Cliente',"La longitud de carácteres del documento del cliente es incorrecta");
      return;
    }
    else if (parseInt($('#cboTipoCliente').find('option:selected').attr('data-prs')) === 1 && (<HTMLInputElement>document.getElementById("txtRasonSocialCli")).value.trim() ==''){
      this.NotificacionGeneral('warning','Nuevo Cliente',"No ha ingresaro razón social para el cliente");
      return;
    }
    else if (parseInt($('#cboTipoCliente').find('option:selected').attr('data-pna')) === 1 && (<HTMLInputElement>document.getElementById("txtNombresApeCli")).value.trim()  ==''){
      this.NotificacionGeneral('warning','Nuevo Cliente',"No ha ingresado nombres para el cliente");
      return;
    }
    
    if ((<HTMLInputElement>document.getElementById("spanCodigoCliente")).textContent === ' - '){
      vCodigoAval = 0;
    }
    else {
      vCodigoAval =parseInt((<HTMLInputElement>document.getElementById("spanCodigoCliente")).textContent!);
    }

    let nuevoCliente: NuevoCliente[]=[{
      ACCION:1,
      CODIGO_CLIENTE:0,
      NOMBRES_CLIENTE:(<HTMLInputElement>document.getElementById("txtNombresApeCli")).value.trim(),
      CONYUGE_CLIENTE:(<HTMLInputElement>document.getElementById("txtDatosConyuge")).value.trim(),
      DIRECCION_CLIENTE:(<HTMLInputElement>document.getElementById("txtDireccion")).value.trim(),
      TELEFONO1_CLIENTE:(<HTMLInputElement>document.getElementById("txtTelefono1")).value.trim(),
      TELEFONO2_CLIENTE:(<HTMLInputElement>document.getElementById("txtTelefono2")).value.trim(),
      AVAL_CLIENTE: vCodigoAval,
      CORREO_CLIENTE:(<HTMLInputElement>document.getElementById("txtCorreoElec")).value.trim(),
      CREAUSU_CLIENTE:2,
      CODIGO_TIPOLI:parseInt((<HTMLInputElement>document.getElementById("cboTipoCliente")).value),
      RAZONSOCIAL_CLIENTE:(<HTMLInputElement>document.getElementById("txtRasonSocialCli")).value.trim(),
      CODIGO_TIPODOCLI:parseInt((<HTMLInputElement>document.getElementById("cboTipoDocuCliente")).value),
      DOCUMENTO_CLIENTE:(<HTMLInputElement>document.getElementById("txtDNICliente")).value.trim(),
      MOROSO_CLIENTE:0
    }]

    this.clienteService.RegistrarActualizarNuevoCliente(nuevoCliente).subscribe( resp => {
      if (parseInt(resp[0].RE) ===1){
        this.RegistrarFileCliente(parseInt(resp[0].ID));
        
      }
      else if (parseInt(resp[0].RE) ===0){
        this.NotificacionGeneral('warning','Nuevo Cliente',resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error','Nuevo Cliente',"Ocurrio un inconveniente al registrar los datos del cliente");
      }
    });

  }

  RegistrarFileCliente(pCliente:number){
  
    let listDocumentos = (<HTMLInputElement>document.getElementById("dtFilesnewclientebody")).children;

    for (let i = 0; i < listDocumentos.length; i++) {
      
      let fileadjuntado : any = (<HTMLInputElement>listDocumentos[i].children[1].children[0]);

      if ((<HTMLInputElement>listDocumentos[i].children[1].children[0]).value != "" ){
        this.clienteService.subirarchivofile(fileadjuntado.files[0], pCliente.toString()).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err)
        })
      }
    }

    this.router.navigate(['/pages/listarcliente']);

  }

  NotificacionGeneral(pIcon:any, pTitle:any, pMensaje:any) {
    Swal.fire({
        icon: pIcon,
        title: pTitle,
        text: pMensaje
    });
  }

  
}
