import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CierrecajaService } from 'src/app/services/cierrecaja.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2'
import { CierreCajaSaldos } from 'src/app/models/cierrecajasaldos.model';

@Component({
  selector: 'app-cierresaldos',
  templateUrl: './cierresaldos.component.html',
  styleUrls: ['./cierresaldos.component.css']
})
export class CierresaldosComponent {

  public listcierrecajasaldos: any[] = [];
  public vgComponenteRecargar: number = 0;
  public vgFechaIni: string = '-';
  public vgFechaFin: string = '-';
  public vgSumTotalCreditos: number = 0;
  public vgSumTotalCreditosString: any = 0;
  public vgSumTotalSaldos: number = 0;
  public vgSumTotalSaldosString: any = 0;
  public vgSumTotalSaldosRef: number = 0;
  public vgSumTotalSaldosRefString: any = 0;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  constructor(private cierrecajaSer: CierrecajaService, private chRef: ChangeDetectorRef, private _activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = this._activatedRoute.snapshot.params['idaccion'];
      const fini = this._activatedRoute.snapshot.params['fini'];
      const ffin = this._activatedRoute.snapshot.params['ffin'];
      this.ListarCierreCajaSaldos(id, fini, ffin);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListarCierreCajaSaldos(pCodPersonalCo: string, pFechaIni: string, pFechaFin: string): void {

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

    this.cierrecajaSer.ListarCierreCajaSaldos(parseInt(pCodPersonalCo), pFechaIni, pFechaFin).subscribe(resp => {
      this.listcierrecajasaldos = resp;

      this.vgSumTotalCreditos = this.listcierrecajasaldos[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        return accumulator + parseFloat((object.MONTO_CRE).replace(/,/gi, ''));
      }, 0);
      this.vgSumTotalSaldos = this.listcierrecajasaldos[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        let saldo = object.SALDO == null || object.SALDO == '--' ? 0 : (object.SALDO).replace(/,/gi, '');
        return accumulator + parseFloat(saldo);
      }, 0);

      this.vgSumTotalSaldosRef = this.listcierrecajasaldos[0].JSON_CREDITOS.reduce((accumulator: number, object: any) => {
        let saldoref = object.SALDO == null || object.SAL_REF == '--' ? 0 : (object.SAL_REF).replace(/,/gi, '');
        return accumulator + parseFloat(saldoref);
      }, 0);
      this.vgSumTotalCreditosString = this.FormatoNumeros(this.number_format(this.vgSumTotalCreditos, 2)) ;
      this.vgSumTotalSaldosString = this.FormatoNumeros(this.number_format(this.vgSumTotalSaldos, 2))  ;
      this.vgSumTotalSaldosRefString = this.FormatoNumeros(this.number_format(this.vgSumTotalSaldosRef, 2)) ;
      
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

  onClickBuscarCierreCajaAccesoDirecto(pAccion: number, pFechaIni: string, pFechaFin: string) {
    //this.router.navigate(['/pages/cierresaldos',pAccion,pFechaIni, pFechaFin]);
    window.location.href = window.location.origin + '/pages/cierresaldos/' + pAccion + '/' + pFechaIni + '/' + pFechaFin;
  }

  onClickBuscarCierreModal() {
    window.location.href = window.location.origin + '/pages/cierresaldos/' + (<HTMLInputElement>document.getElementById("txtAccionCierreCaja")).value + '/' + (<HTMLInputElement>document.getElementById("dtFechaCierreCaja")).value + '/' + (<HTMLInputElement>document.getElementById("dtFechaCierreCaja")).value;
  }

  onClickCerrarCierreCaja() {
    let objCierreCaja: CierreCajaSaldos = {
      ANIO_CIERRECAJA: parseInt((<HTMLInputElement>document.getElementById("txtAnioCierreCaja")).value),
      MES_CIERRECAJA: parseInt((<HTMLInputElement>document.getElementById("txtMesCierreCaja")).value),
      FECHAIN_CIERRECAJA: (<HTMLInputElement>document.getElementById("txtFechaIniCierreCaja")).value,
      FECHAFIN_CIERRECAJA: (<HTMLInputElement>document.getElementById("txtFechaFinCierreCaja")).value,
      MOROSO_CIERRECAJA: parseInt((<HTMLInputElement>document.getElementById("txtAccionCierreCaja")).value),
      FLAG_SEMANA: parseInt((<HTMLInputElement>document.getElementById("txtFlagSemanaCierreCaja")).value)
    }

    this.NotificacionPregunta('question', 'Cierre de Caja', '¿Estas seguro de Realizar el Cierre de Caja?', 'NotificacionPregunta', objCierreCaja);

  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pObjArray: CierreCajaSaldos) {
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

        this.cierrecajaSer.CerrarCierreCaja(pObjArray).subscribe(resp => {
          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Cierre de Caja', resp[0].ME);
          }
          else if (parseInt(resp[0].RE) === 0) {
            this.NotificacionGeneral('warning', 'Cierre de Caja', resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error', 'Cierre de Caja', "Ocurrio un inconveniente al eliminar el registro");
          }
        });
      }
    });
  }

  OnclickDescargarPDF() {
    window.print();
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
