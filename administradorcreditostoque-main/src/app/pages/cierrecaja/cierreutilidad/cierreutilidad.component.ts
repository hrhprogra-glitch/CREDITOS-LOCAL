import { ChangeDetectorRef, Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CierrecajaService } from 'src/app/services/cierrecaja.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2'
import { CierreCajaUtilidad } from 'src/app/models/cierreUtilidad.model';
import { CierreCajaUtilidadDetalle } from 'src/app/models/CierreUtilidadDetalle.model';

@Component({
  selector: 'app-cierreutilidad',
  templateUrl: './cierreutilidad.component.html',
  styleUrls: ['./cierreutilidad.component.css']
})
export class CierreutilidadComponent {

  public listcierrecajaUtilidad: any[] = [];
  public listcierrecajaUtilidadNeta: any[] = [];
  public vgComponenteRecargar: number = 0;
  public vgComponenteRecargarNeta: number = 0;
  public vgSumTotalCreditos : number = 0;
  public vgSumTotalCreditosString : any = 0;
  public vgSumTotalUtiAcu : number = 0;
  public vgSumTotalUtiAcuString : any = 0;
  public vgSumTotalUtilidadNeta : number = 0;
  public vgSumTotalUtilidadNetaString : any = 0;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  public dtOptionsNeta: DataTables.Settings = {};
  public dtTriggerNeta: Subject<any> = new Subject();

  @ViewChild('cerrarModalCierreUtilidad') cerrarModalCodigo!: ElementRef;
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  constructor(private cierrecajaSer: CierrecajaService, private chRef: ChangeDetectorRef, private _activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const fini = this._activatedRoute.snapshot.params['fini'];
      const ffin = this._activatedRoute.snapshot.params['ffin'];
      this.ListarCierreCajaUtilidad(fini,ffin);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTriggerNeta.unsubscribe();
  }

  ListarCierreCajaUtilidad(pFechaIni:string, pfechaFin:string): void {

    this.dtOptions = {

      "lengthChange": true, "autoWidth": false,
      "paging": true,
      "ordering": false,
      "order": [[0, "asc"]],
      "pageLength": 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.dtOptionsNeta = {

      "lengthChange": true, "autoWidth": false,
      "paging": true,
      "ordering": false,
      "order": [[0, "asc"]],
      "pageLength": 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.cierrecajaSer.ListarCierreUtilidad(1, pFechaIni, pfechaFin).subscribe(resp => {
      this.listcierrecajaUtilidad = resp;

      this.vgSumTotalCreditos = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.MONT_CRE).replace(/,/gi, '')) ;
      }, 0);
      this.vgSumTotalUtilidadNeta = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTI).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalUtiAcu = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTIL_ANT).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalCreditosString = this.FormatoNumeros(this.number_format(this.vgSumTotalCreditos, 2)) ;
      this.vgSumTotalUtiAcuString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtiAcu, 2))  ;
      this.vgSumTotalUtilidadNetaString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtilidadNeta, 2)) ;

      if (this.vgComponenteRecargar == 0) {
        this.chRef.detectChanges();
        this.dtTrigger.next();
        this.dtTriggerNeta.next();
        this.vgComponenteRecargar = 1;
      }
      else {
        this.rerender_datatable();
      }
      
    });

    
  }

  onClickBuscarCierreUtilidadModal() {
    /*this.cierrecajaSer.ListarCierreUtilidad(1, (<HTMLInputElement>document.getElementById("dtFechaCierreUtilidad")).value, (<HTMLInputElement>document.getElementById("dtFechaCierreUtilidad")).value).subscribe(resp => {
      if (typeof resp[0].JSON_CREDITOS === 'undefined') {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', "No se encontro registros");
        return;
      }
      this.listcierrecajaUtilidad = resp;
      this.vgSumTotalCreditos = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.MONT_CRE).replace(/,/gi, '')) ;
      }, 0);
      this.vgSumTotalUtilidadNeta = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTI).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalUtiAcu = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTIL_ANT).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalCreditosString = this.FormatoNumeros(this.number_format(this.vgSumTotalCreditos, 2)) ;
      this.vgSumTotalUtiAcuString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtiAcu, 2))  ;
      this.vgSumTotalUtilidadNetaString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtilidadNeta, 2)) ;

      this.rerender_datatable();
      this.rerender_datatableNeta();
      this.cerrarModalCodigo.nativeElement.click();

    });*/

    window.location.href = window.location.origin + '/pages/cierreutilidad/' + (<HTMLInputElement>document.getElementById("dtFechaCierreUtilidad")).value + '/' + (<HTMLInputElement>document.getElementById("dtFechaCierreUtilidad")).value;

  }

  onClickBuscarCierreUtilidadAccesoDirecto(pAccion: number, pFechaIni: string, pFechaFin: string) {
    /*this.cierrecajaSer.ListarCierreUtilidad(pAccion, pFechaIni, pFechaFin).subscribe(resp => {
      if (typeof resp[0].JSON_CREDITOS === 'undefined') {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', "No se encontro registros");
        return;
      }
      this.listcierrecajaUtilidad = resp;
      this.vgSumTotalCreditos = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.MONT_CRE).replace(/,/gi, '')) ;
      }, 0);
      this.vgSumTotalUtilidadNeta = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTI).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalUtiAcu = this.listcierrecajaUtilidad[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.UTIL_ANT).replace(/,/gi, '')) ;
      }, 0);

      this.vgSumTotalCreditosString = this.FormatoNumeros(this.number_format(this.vgSumTotalCreditos, 2)) ;
      this.vgSumTotalUtiAcuString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtiAcu, 2))  ;
      this.vgSumTotalUtilidadNetaString = this.FormatoNumeros(this.number_format(this.vgSumTotalUtilidadNeta, 2)) ;

      this.rerender_datatable();
      this.cerrarModalCodigo.nativeElement.click();
    });*/
    window.location.href = window.location.origin + '/pages/cierreutilidad/'  + pFechaIni + '/' + pFechaFin;

  }
  OnclickDescargarPDF() {
    window.print();
  }

  

  onClickCerrarCierreUtilidad() {

    let detalleUtilidad: CierreCajaUtilidadDetalle[] = [];
    
    const table: HTMLTableElement = document.querySelector('#tCierreCajaUtilidad')!;
    const rows = table.tBodies[0].rows;
    Array.from(rows).forEach((row, idx) => {
      let codigoCliente = Array.from(row.cells).map(td => td)[0];
      let estadoUtilidad = Array.from(row.cells).map(td => td)[7].textContent;
      detalleUtilidad.push({
        CODIGO_CREDITO: parseInt(Array.from(row.cells).map(td => td)[0].textContent!),
        CODIGO_CLIENTE: parseInt((<HTMLInputElement>codigoCliente.children[0]).textContent!),
        UTILIDADA_CIERRECAJA_UTILIDAD_D: parseFloat((Array.from(row.cells).map(td => td)[5].textContent!).replace(/,/gi, '')),
        UTILIDADU_CIERRECAJA_UTILIDAD_D: parseFloat((Array.from(row.cells).map(td => td)[6].textContent!).replace(/,/gi, '')),
        ESTADO_CIERRECAJA_UTILIDAD_D: estadoUtilidad == " 100%" ? 1 : 0
      });
    });

    if (detalleUtilidad.length === 0) {
      this.NotificacionGeneral('warning', 'Cierre de Caja', "No ha generado el cronograma de pagos");
      return;
    }
    else if (detalleUtilidad.length !== parseInt((<HTMLInputElement>document.getElementById("txtTotalregistros")).value)){
      this.NotificacionGeneral('warning', 'Cierre de Caja', "Seleccione todos los registros para proceder con el cierre del Reporte de Utilidad");
      return;
    }

    let objCierreCaja: CierreCajaUtilidad = {
      ANIO_CIERRECAJA_UTILIDAD: parseInt((<HTMLInputElement>document.getElementById("txtAnioCierreCajaUtilidad")).value),
      MES_CIERRECAJA_UTILIDAD: parseInt((<HTMLInputElement>document.getElementById("txtMesCierreCajaUtilidad")).value),
      FECHAINI_CIERRECAJA_UTILIDAD: (<HTMLInputElement>document.getElementById("txtFechaIniCierreCajaUtilidad")).value,
      FECHAFIN_CIERRECAJA_UTILIDAD: (<HTMLInputElement>document.getElementById("txtFechaFinCierreCajaUtilidad")).value,
      DETALLE_CIERRE_UTILIDAD: detalleUtilidad
    }

    this.NotificacionPregunta('question', 'Cierre de Caja', '¿Estas seguro de Realizar el Cierre de Utilidades?', 'NotificacionPregunta', objCierreCaja);

  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pObjArray: CierreCajaUtilidad) {
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

        this.cierrecajaSer.CerrarCierreCajaUtilidad(pObjArray).subscribe(resp => {
          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Cierre Utilidad', resp[0].ME);
          }
          else if (parseInt(resp[0].RE) === -1) {
            this.NotificacionGeneral('warning', 'Cierre Utilidad', resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error', 'Cierre Utilidad', "Ocurrio un inconveniente al realizar el cierre de Utilidad");
          }
        });
      }
    });
  }
  number_format(amount: any, decimals: number) {

    amount += '';
    amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));

    decimals = decimals || 0;

    if (isNaN(amount) || amount === 0)
      return parseFloat('0.00').toFixed(decimals);

    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;

    return amount_parts.join('.');
  }

  FormatoNumeros(nStr:any) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
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
