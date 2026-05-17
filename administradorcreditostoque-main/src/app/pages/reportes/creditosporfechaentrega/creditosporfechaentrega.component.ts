import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-creditosporfechaentrega',
  templateUrl: './creditosporfechaentrega.component.html',
  styleUrls: ['./creditosporfechaentrega.component.css']
})
export class CreditosporfechaentregaComponent {

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;


  public listaCreditossegunformaentrega: any[] = [];
  public listCreditoref: any[] = [];
  public vgDetalleFe: any[] = [];
  public vgComponenteRecargar: number = 0;
  public vgCountreg: number = 0;
  public vgTotal: number = 0;
  public vgListToatles: any[] = [];
  public vgListToatlesref: any[] = [];
  constructor(private reporteService: ReporteService, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Listarcreditossegunformaentrega();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  Listarcreditossegunformaentrega(): void {

    this.dtOptions = {
      "lengthChange": true, "autoWidth": false,
      "paging": true,
      "ordering": false,
      "pageLength": -1,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.reporteService.ConsultarCreditossegunformaentregaxfecha(1, "-", "-").subscribe(resp => {
      
      this.listaCreditossegunformaentrega = resp[0].JSON_CE;
      this.listCreditoref = resp[0].JSON_CRE;
      this.vgTotal = resp[0].JSON_CET[0].TE;
      this.vgListToatles = resp[0].JSON_ST;
      this.vgListToatlesref = resp[0].JSON_CREST;
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

  onclickBuscarcreditosporrangofecha(pFechaIni: string, pFechaFin: string) {
    if (pFechaIni.trim() == '' || pFechaFin.trim() == '') {
      return;
    }
    this.reporteService.ConsultarCreditossegunformaentregaxfecha(1, pFechaIni, pFechaFin).subscribe(resp => {
      this.listaCreditossegunformaentrega = resp[0].JSON_CE;
      this.listCreditoref = resp[0].JSON_CRE;
      this.vgTotal = resp[0].JSON_CET[0].TE;
      this.vgListToatles = resp[0].JSON_ST;
      this.vgListToatlesref = resp[0].JSON_CREST;
      this.rerender_datatable();
    });
  }

  parseJson(pData: string) {
    this.vgDetalleFe = JSON.parse(pData);
  }

  OnclickDescargarPDFreporte(){
    window.print();
  }
  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.dtTrigger.next();
    });
  }

}
