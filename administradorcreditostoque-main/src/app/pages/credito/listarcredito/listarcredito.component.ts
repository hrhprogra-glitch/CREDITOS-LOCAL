import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CreditosService } from '../../../services/creditos.service';
import { Router } from '@angular/router';
import { ConsultarCreditos } from '../../../models/consultarCredito.model';

import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { ActualizarMontoCredito } from '../../../models/actualizarMontocredito.model';
import { DataTableDirective } from 'angular-datatables';

declare const $:any;
@Component({
  selector: 'app-listarcredito',
  templateUrl: './listarcredito.component.html',
  styles: [
  ]
})

export class ListarcreditoComponent implements OnInit, OnDestroy {

  public listarCreditos :ConsultarCreditos [] = [];
  public listarClientes :any [] = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();;
  @ViewChild('cerrarModalCliente') cerrarModalCliente!: ElementRef;
  @ViewChild(DataTableDirective ,{static: false}) dtElement!: DataTableDirective;

  constructor(private creditoServicio: CreditosService, private router: Router,private chRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getGestionarCreditosConsultas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getGestionarCreditosConsultas(): void{
    this.dtOptions = {
      
      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
       "order": [[ 7, "desc" ]],
      language: {
        url:'//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.creditoServicio.getConsultarCreditos(1,0,0).subscribe( resp => {
      this.listarCreditos = resp;
      this.chRef.detectChanges();

      this.dtTrigger.next();
      
    });
  }
  onclickAnularcredito(pCodCredito:any){
    const selectEl = pCodCredito.target;
    let actualizarCredito: ActualizarMontoCredito[]=[{
      ACCION:3,
      CODIGO_CREDITO:selectEl.getAttribute('data-codcre'),
      NUM_CUOTA:0,
      MONTO_A_PAGAR :0,
      COD_USUARIO:2
    }]
    this.NotificacionPregunta('question','Anular Crédito','¿Estas seguro de anular el crédito?','NotificacionPregunta',actualizarCredito);
  }

  NotificacionPregunta(pIcon:any, pTitle:any, pMensaje:any, pAccion:any, pObjArray:any) {
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

            this.creditoServicio.ActualizarCreditoCuota(pObjArray).subscribe( resp => {
        
              if (parseInt(resp[0].RE) ===1){
                this.NotificacionGeneral('success','Anular Crédito',"Se anulo correctamente el crédito");
              }
              if (parseInt(resp[0].RE) ===0){
                this.NotificacionGeneral('warning','Anular Crédito',resp[0].ME);
              }
              else {
                this.NotificacionGeneral('error','Anular Crédito',"Ocurrio un inconveniente al anular el crédito");
              }
            });
        }
    });
  }

  OnClickBuscarListarClienteCre( pNombRazonsocial: string) {
    if (pNombRazonsocial == '') {
      pNombRazonsocial = '-';
    }
    this.ListarClienteCre(pNombRazonsocial);
  }

  ListarClienteCre( pNomRazonSo: any) {
    this.creditoServicio.listarClienteCre(1, 0, "-", pNomRazonSo).subscribe(resp => {
      this.listarClientes = resp;
      return this.listarClientes;
    });
  }

  SeleccionarClienteCredito(pClienteAval: any) {
    const selectAval = pClienteAval.target;
    (<HTMLInputElement>document.getElementById("txtClienteBusquedaAvanzada")).value = selectAval.getAttribute('data-nomrs');
    (<HTMLInputElement>document.getElementById("txtCodigoCliente")).value = selectAval.getAttribute('data-codcli');
    this.cerrarModalCliente.nativeElement.click();
  }

  onClickCreditoPorFechaCliente(pCodigoCliente : string, pFechaIni : string, pFechaFin :  string) {
    console.log(pCodigoCliente);
    if (pFechaIni == '') {
      pFechaIni = '-';
    }
    if (pFechaFin == '') {
      pFechaFin = '-';
    }

    this.creditoServicio.getConsultarCreditosPorFechaCliente(parseInt(pCodigoCliente) , pFechaIni,pFechaFin).subscribe(resp => {
      this.listarCreditos = resp;
      this.rerender_datatable_credito();

    });
  }

  rerender_datatable_credito() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();      
      this.dtTrigger.next();      
    });
  }

  onClickBorrarDatosClientes(){
    (<HTMLInputElement>document.getElementById("txtClienteBusquedaAvanzada")).value = "";
    (<HTMLInputElement>document.getElementById("txtCodigoCliente")).value = "0";
  }

  onClieckActualizarCreditos(){
    (<HTMLInputElement>document.getElementById("txtClienteBusquedaAvanzada")).value = "";
    (<HTMLInputElement>document.getElementById("txtCodigoCliente")).value = "0";
    (<HTMLInputElement>document.getElementById("dtFechaIniCredito")).value = "";
    (<HTMLInputElement>document.getElementById("dtFechaFinCredito")).value = "";
    
    this.creditoServicio.getConsultarCreditos(1,0,0).subscribe( resp => {
      this.listarCreditos = resp;
      this.rerender_datatable_credito();     
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
