import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CuadernocobranzaService } from 'src/app/services/cuadernocobranza.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { ActualizarCuadernoCobranzaDepEfec } from 'src/app/models/actualizarCuadernoCobranzaDepositoEfec.model';
import { ActualizarNotasDepEfec } from 'src/app/models/actualizarNotaDepEfec.model';
import { SeguridadService } from 'src/app/services/seguridad.service';
declare const $: any;
@Component({
  selector: 'app-cuadernocobranzaporcobrador',
  templateUrl: './cuadernocobranzaporcobrador.component.html',
  styleUrls: ['./cuadernocobranzaporcobrador.component.css']
})
export class CuadernocobranzaporcobradorComponent implements OnInit {

  public lisCuadernoCobranza: any[] = [];
  public listarCuadernoCobranzaRangoFecha: any = [];

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  @ViewChild('cerrarModalCodigo') cerrarModalCodigo!: ElementRef;
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  public vgDiaCobranza: string = "";
  public vgPersonalCobramza: string = "";
  public vgCliente: string = "";
  public vgMontoCobranza: number = 0;
  public vgTipoCobranza: string = "";
  public vgAccion: number = 0;
  public vgAccionDE: Number = 0;
  public vgCuaCo: number = 0;
  public vgCodCre: number = 0;
  public vgCodCli: number = 0;
  public vgCodPer: number = 0;
  public vgComponenteRecargar: number = 0;

  public vgBloquearBotonDE: boolean = false;
  constructor(private cuadernoCobranzaSer: CuadernocobranzaService, private chRef: ChangeDetectorRef, private _activatedRoute: ActivatedRoute, private servicioSeguridad:SeguridadService) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = this._activatedRoute.snapshot.params['idpercobran'];
      this.ListarCuadernoCobranza(id);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListarCuadernoCobranza(pCodPersonalCo: string): void {

    this.dtOptions = {

      "lengthChange": true, "autoWidth": false,
      "paging": true,
      "ordering": false,
      "order": [[0, "asc"]],
      "pageLength": -1,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.cuadernoCobranzaSer.listarCuadernoCobranzaDepositoEfectivo(1, 0, parseInt(pCodPersonalCo)).subscribe(resp => {
      this.lisCuadernoCobranza = resp;
      if (this.vgComponenteRecargar == 0) {
        this.chRef.detectChanges();
        this.dtTrigger.next();
        this.vgComponenteRecargar = 1;
      }
      else {
        this.rerender_datatable();
      }

      
    });
  }

  onClickIngresarCobranza(pDiacobranza: string, pPersonal: string, pCliente: string, pTipocobro: string, pMonto: number,
    pAccion: number, pAccionDE: number, pCodCuCo: number, pCodCre: number, pCodCli: number, pCodPer: number) {
    this.vgDiaCobranza = pDiacobranza;
    this.vgPersonalCobramza = pPersonal;
    this.vgCliente = pCliente;
    this.vgTipoCobranza = pTipocobro;
    this.vgMontoCobranza = pMonto;
    this.vgAccion = pAccion;
    this.vgAccionDE = pAccionDE;
    this.vgCuaCo = pCodCuCo;
    this.vgCodCre = pCodCre;
    this.vgCodCli = pCodCli;
    this.vgCodPer = pCodPer;
  }

  onclickActualizarCreditoClienteDepositoEfectivo(pAccion: string, pAccionDE: string, pCodigoCuadernoCobranza: string, pCodigoCliente: string, pCodigoPersonalCobranza: string, pCodigoCredito: string, pMonto: string) {
    this.servicioSeguridad.cargarMenu()
    if (parseInt(this.servicioSeguridad.menu[0].EMC) === 0 && this.vgMontoCobranza > 0){
      this.NotificacionGeneral('warning', 'Lista de Cobranza', "Usted no tiene permisos para Actualizar/Editar el MONTO de la cobranza");
      return;
    }
    this.vgBloquearBotonDE = true;

    let objActualizarCuaCobranza: ActualizarCuadernoCobranzaDepEfec = {
      ACCION: parseInt(pAccion),
      ACCION_DE: parseInt(pAccionDE),
      CODIGO_CUADERNO_COBRANZA: parseInt(pCodigoCuadernoCobranza),
      CODIGO_CLIENTE: parseInt(pCodigoCliente),
      CODIGO_PERSONAL_COBRANZA: parseInt(pCodigoPersonalCobranza),
      CODIGO_CREDITO: parseInt(pCodigoCredito),
      MONTO_PAGADO: parseFloat(pMonto)
    }

    this.cuadernoCobranzaSer.ActualizarCuadernoCobranzaDepoEfec(objActualizarCuaCobranza).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.cerrarModal.nativeElement.click();
        this.NotificacionGeneral('success', 'Listado de Cobranzas', "Se ingreso correctamente la cobranza");
        console.log(resp[0].MON);
        $('#aMonto' + pAccionDE + pCodigoCredito).text(resp[0].MON);
      }
      else if (parseInt(resp[0].RE) === 0) {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Listado de Cobranzas', "Ocurrio un inconveniente al actualizar el crédito");
      }
      this.vgBloquearBotonDE = false;
    });

  }

  onClickBuscarCuadernoCobranzaDEPorCodigoAccesoDirecto(pCodigoCuadernoCobranza: number, pSemana: string) {
    const id = this._activatedRoute.snapshot.params['idpercobran'];
    this.cuadernoCobranzaSer.listarCuadernoCobranzaDepositoEfectivo(1, pCodigoCuadernoCobranza, parseInt(id)).subscribe(resp => {
      if (typeof resp[0].JSON_CREDITOS === 'undefined') {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', "No se encontro registros para la semana " + pSemana);
        return;
      }
      this.lisCuadernoCobranza = resp;
      this.rerender_datatable();
    });
  }

  onClickBuscarCuadernoCobranzaPorFechaDE() {
    this.cuadernoCobranzaSer.listarCuadernoCobranzaRangoFecha(2, (<HTMLInputElement>document.getElementById("dtFechaIniCuadernoCobranza")).value, (<HTMLInputElement>document.getElementById("dtFechaFinCuadernoCobranza")).value).subscribe(resp => {
      return this.listarCuadernoCobranzaRangoFecha = resp;

    });
  }

  onClickbuscarCuadernoCobranzaPorCodigoDE(pCodigoCuadernoCobra: number, pSemana1: string, pSemana2: string) {

    const id = this._activatedRoute.snapshot.params['idpercobran'];
    this.cuadernoCobranzaSer.listarCuadernoCobranzaDepositoEfectivo(1, pCodigoCuadernoCobra, parseInt(id)).subscribe(resp => {
      if (typeof resp[0].JSON_CREDITOS === 'undefined') {
        this.cerrarModalCodigo.nativeElement.click();
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', "No se encontro registros para la semana del  " + pSemana1 + " al " + pSemana2);
        return;
      }
      this.lisCuadernoCobranza = resp;
      this.rerender_datatable();
      this.cerrarModalCodigo.nativeElement.click();

    });
  }

  onclickActualizarNotasDepositoEfectivo(pAccion: string, pCodigoCuadernoCobranza: string, pCodigoCliente: string, pCodigoPersonalCobranza: string, pCodigoCredito: string, pNota: string) {

    this.vgBloquearBotonDE = true;

    let objActualizarCuaCobranza: ActualizarNotasDepEfec = {
      ACCION: parseInt(pAccion),
      CODIGO_CUADERNO_COBRANZA: parseInt(pCodigoCuadernoCobranza),
      CODIGO_CLIENTE: parseInt(pCodigoCliente),
      CODIGO_PERSONAL_COBRANZA: parseInt(pCodigoPersonalCobranza),
      CODIGO_CREDITO: parseInt(pCodigoCredito),
      NOTAS: pNota
    }

    this.cuadernoCobranzaSer.ActualizarNotasDepoEfec(objActualizarCuaCobranza).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.cerrarModal.nativeElement.click();
        this.NotificacionGeneral('success', 'Listado de Cobranzas', resp[0].ME);
        $('#spanNota' + pAccion + pCodigoCredito).text(pNota);
      }
      else if (parseInt(resp[0].RE) === 0) {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Listado de Cobranzas', "Ocurrio un inconveniente al actualizar el crédito");
      }
      this.vgBloquearBotonDE = false;
    });

  }

  onClickEliminarRegistroCobranza(pAccion: string, pCodigoCuadernoCobranza: string, pCodigoCliente: string, pCodigoPersonalCobranza: string, pCodigoCredito: string, pCliente: string) {

    let objActualizarCuaCobranza: ActualizarNotasDepEfec = {
      ACCION: parseInt(pAccion),
      CODIGO_CUADERNO_COBRANZA: parseInt(pCodigoCuadernoCobranza),
      CODIGO_CLIENTE: parseInt(pCodigoCliente),
      CODIGO_PERSONAL_COBRANZA: parseInt(pCodigoPersonalCobranza),
      CODIGO_CREDITO: parseInt(pCodigoCredito),
      NOTAS: '-'
    }

    this.NotificacionPregunta('question', 'Anular Crédito', '¿Estas de eliminar la cobranza del cliente ' + pCliente + '?', 'NotificacionPregunta', objActualizarCuaCobranza);

  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pObjArray: ActualizarNotasDepEfec) {
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

        this.cuadernoCobranzaSer.ActualizarNotasDepoEfec(pObjArray).subscribe(resp => {
          if (parseInt(resp[0].RE) === 1) {

            this.NotificacionGeneral('success', 'Listado de Cobranzas', resp[0].ME);
            
            const idCodPer = this._activatedRoute.snapshot.params['idpercobran'];
            this.cuadernoCobranzaSer.listarCuadernoCobranzaDepositoEfectivo(1, pObjArray.CODIGO_CUADERNO_COBRANZA, parseInt(idCodPer)).subscribe(resp => {
              if (typeof resp[0].JSON_CREDITOS === 'undefined') {
                return;
              }
              this.lisCuadernoCobranza = resp;
              this.rerender_datatable();

            });

          }
          else if (parseInt(resp[0].RE) === 0) {
            this.NotificacionGeneral('warning', 'Listado de Cobranzas', resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error', 'Listado de Cobranzas', "Ocurrio un inconveniente al eliminar el registro");
          }
        });
      }
    });
  }


  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.dtTrigger.next();
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
