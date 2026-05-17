import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';
import { DashboardComponent } from '../../dashboard.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-listadocreditos',
  templateUrl: './listadocreditos.component.html',
  styles: [
  ]
})
export class ListadocreditosComponent implements OnInit,OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();;

  public listarCreditoPorEstado: any[] = [];
  @ViewChild(DataTableDirective ,{static: false}) dtElement!: DataTableDirective;
  

  constructor(private dashboardServicio: DashboardService, private chRef : ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  public onClickConsultarCreditosPorEstado(pEstadoCredito : number)  : void {

    this.dtOptions = {
      
      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      language: {
        url:'//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.dashboardServicio.ConsultarDataDashboard(3,pEstadoCredito).subscribe(resp => {
      this.listarCreditoPorEstado = resp;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    });
  }

  public onClickConsultarCreditosPorEstado2(pEstadoCredito : number)  : void {


    this.dashboardServicio.ConsultarDataDashboard(3,pEstadoCredito).subscribe(resp => {
      this.listarCreditoPorEstado = resp;
      this.rerender_datatable();
    });
  }
  
  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();      
      this.dtTrigger.next();      
    });
  }

}
