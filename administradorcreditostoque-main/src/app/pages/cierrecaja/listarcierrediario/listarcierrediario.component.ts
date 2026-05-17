import { Component, ChangeDetectorRef ,ViewChild} from '@angular/core';
import { CierrecajaService } from 'src/app/services/cierrecaja.service';
import { Subject } from 'rxjs';
import { CierreDiario } from 'src/app/models/cierreDiario.model';
import { DataTableDirective } from 'angular-datatables';

import Swal from 'sweetalert2'
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-listarcierrediario',
  templateUrl: './listarcierrediario.component.html',
  styleUrls: ['./listarcierrediario.component.css']
})
export class ListarcierrediarioComponent {

  public vgListaCierreDiario: any[] = [];

  public dtOptionsCD: DataTables.Settings = {};
  public dtTriggerCD: Subject<any> = new Subject();
  @ViewChild(DataTableDirective ,{static: false}) dtElement!: DataTableDirective;

  constructor(private cierrecajaService: CierrecajaService, private chRef: ChangeDetectorRef, private servicioSeguridad:SeguridadService) {
    
  }

  ngOnInit(): void {
    this.ListarCierreDiario();
  }

  ngOnDestroy(): void {
    this.dtTriggerCD.unsubscribe();
  }
  ListarCierreDiario(): void {

    this.dtOptionsCD = {

      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      "order": [[ 0, "desc" ]],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.cierrecajaService.ListarCierrecajaDiario(1, 0).subscribe(resp => {
      this.vgListaCierreDiario = resp;

      this.chRef.detectChanges();

      this.dtTriggerCD.next();
    });
  }

  onClickAnularcierre(pId:number, pFecha:string){
    this.servicioSeguridad.cargarMenu()

    if (parseInt(this.servicioSeguridad.menu[0].ACCD)===0){
      this.NotificacionGeneral('warning', 'Cierre de Caja Diario', "Usted no tiene permisos para Anular cierre de caja Diario");
      return;
    }
    let objCierreCaja: CierreDiario = {
      ACCION: 2,
      CODIGO_CD: pId,
      FECHA_CIERRE_CD: pFecha,
      TOTAL_OFICINA_CD: 0,
      TOTAL_LISTA_COBRANZA_CD: 0,
      TOTAL_GASTOS_CD: 0,
      TOTAL_CIERRE_CD: 0,
      RESUMEN_COBRANZA_OFICINA: [],
      RESUMEN_GASTOS: [],
      RESUMEN_LISTA_COBRANZA: []
    }

    this.NotificacionPregunta("question", 'Cierre de Caja Diario', '¿Estas seguro de ANULAR el cierre de caja diario para la fecha ' +pFecha+'?', objCierreCaja);
  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pObjArray: CierreDiario) {
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

        this.cierrecajaService.CerrarCajaDiario(pObjArray).subscribe(resp => {
          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Cierre de Caja Diario', resp[0].ME);
            this.cierrecajaService.ListarCierrecajaDiario(1, 0).subscribe(resp => {
              this.vgListaCierreDiario = resp;
        
              this.rerender_datatable_cierrediario();
            });
          }
          else if (parseInt(resp[0].RE) === 0) {
            this.NotificacionGeneral('warning', 'Cierre de Caja Diario', resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error', 'Cierre de Caja Diario', "Ocurrio un inconveniente al anular el registro");
          }
        });
      }
    });
  }

  rerender_datatable_cierrediario() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();      
      this.dtTriggerCD.next();      
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
