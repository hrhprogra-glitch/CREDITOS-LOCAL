import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';
import { ListadocreditosComponent } from './modal/listadocreditos/listadocreditos.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public listarInfoGeneral: any[] = [];
  public listarCreditosVencidos: any[] = [];
  public vPorcentajeLiquidado : number = 0;
  public vPorcentajePendiente : number = 0;
  public vPorcentakeAnulado : number = 0;
  public vPorcentajeRefinanciado : number = 0;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();;

  vModalCreditps : number = 0;

  @ViewChild(ListadocreditosComponent) modalListadocredito : any;

  constructor(private dashboardServicio: DashboardService, private chRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.ConsultarDataGeneralDashboard();
    this.ConsultarDataCreditosVencidosDashboard();
  }

  ConsultarDataGeneralDashboard() {
    this.dashboardServicio.ConsultarDataDashboard(2,0).subscribe(resp => {
      this.vPorcentajeLiquidado = Math.round((parseFloat(resp[0].T_CRE_LIQUI)  / parseFloat(resp[0].T_CRE)  ) * 100) ;
      this.vPorcentajePendiente = Math.round((parseFloat(resp[0].T_CRE_PEN)  / parseFloat(resp[0].T_CRE)  ) * 100) ;
      this.vPorcentakeAnulado = Math.round((parseFloat(resp[0].T_CRE_ANU)  / parseFloat(resp[0].T_CRE)  ) * 100) ;
      this.vPorcentajeRefinanciado = Math.round((parseFloat(resp[0].T_CRE_REFI)  / parseFloat(resp[0].T_CRE)  ) * 100) ;
      this.listarInfoGeneral = resp;
      return this.listarInfoGeneral;
    });
  }

  ConsultarDataCreditosVencidosDashboard()  : void {

    this.dtOptions = {
      
      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      language: {
        url:'//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.dashboardServicio.ConsultarDataDashboard(1,0).subscribe(resp => {
      this.listarCreditosVencidos = resp;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    });
  }

  onClickListarCreditosModal(pEstadoCredito :  number){
    if (this.vModalCreditps === 0){
      this.modalListadocredito.onClickConsultarCreditosPorEstado(pEstadoCredito);
    }
    else {
      this.modalListadocredito.onClickConsultarCreditosPorEstado2(pEstadoCredito);
    }
    this.vModalCreditps = 1
    
  }

}
