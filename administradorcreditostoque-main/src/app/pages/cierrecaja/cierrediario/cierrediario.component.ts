import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CierreDiario } from 'src/app/models/cierreDiario.model';
import { CierreDiarioResumenCobranzaOficina } from 'src/app/models/cierreDiarioResumenCobranzaOficina.model';
import { CierreDiarioResumenGastos } from 'src/app/models/cierreDiarioResumenGastos.model';
import { CierreDiarioResumenListaCobranza } from 'src/app/models/cierreDiarioResumenListaCobranza.model';
import { CierrecajaService } from 'src/app/services/cierrecaja.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-cierrediario',
  templateUrl: './cierrediario.component.html',
  styleUrls: ['./cierrediario.component.css']
})
export class CierrediarioComponent {

  public listaSuma1: any[] = [];
  public listaSuma2: any[] = [];
  public listListacobranza: any[] = [];
  public vgTotalefectivo: number = 0.00;

  public vBloquearBoton: boolean = false;
  constructor(private cierrecajaService: CierrecajaService, private router: Router) {

  }

  ngOnInit(): void {
    this.ListarListaCobranzas();
  }

  Listarcreditossegunformaentrega(pFechacierre: string): void {

    this.cierrecajaService.Listarresumenpagossegunlistacobranza(1, pFechacierre).subscribe(resp => {
      this.listaSuma1 = resp[0].JSON_SUMA1;
      this.listaSuma2 = resp[0].JSON_SUMA2;
      this.vgTotalefectivo = this.listaSuma2[0].TE;
    });
  }

  ListarListaCobranzas(): void {

    this.cierrecajaService.Listarresumenpagossegunlistacobranza(2, "-").subscribe(resp => {
      this.listListacobranza = resp;
      console.log(this.listListacobranza);
    });
  }

  onClickRegistrarCierreDiario(pFechaCierre: string, pTotaloficina: string, pTotalLista: string, pTotalGastos: string, pTotalcierre: string) {

    if (pFechaCierre.trim()===""){
      this.NotificacionGeneral('warning', 'Cierre de Caja Diario', "Seleccionar Fecha de cierre");
      return;
    }
    let vResumenOficina: CierreDiarioResumenCobranzaOficina[] = [];
    let vResumenGastos: CierreDiarioResumenGastos[] = [];
    let vResumenListaCobranza: CierreDiarioResumenListaCobranza[] = [];

    /*1. Resumen de Oficina */
    let vListaTablaOficina = (<HTMLInputElement>document.getElementById("dtCobranzasOficinabody")).children;

    for (let i = 0; i < vListaTablaOficina.length; i++) {
      vResumenOficina.push({
        CODIGO_CDRCO: 0,
        CODIGO_CD: 0,
        NOMBRE_CLIENTE_CDRCO: (<HTMLInputElement>vListaTablaOficina[i].children[0]).innerText,
        MONTO_CDRCO: parseFloat(((<HTMLInputElement>vListaTablaOficina[i].children[1]).innerText).replace(/,/gi, '')),
        QUIEN_RECIBIO_CDRCO: (<HTMLInputElement>vListaTablaOficina[i].children[2]).innerText,
        OBSERVACIONES_CDRCO: (<HTMLInputElement>vListaTablaOficina[i].children[3]).innerText
      });
    }

    /*2. Resumen de Gastos */
    let vListaGastosTabla = (<HTMLInputElement>document.getElementById("dtResumengastosbody")).children;

    for (let i = 0; i < vListaGastosTabla.length; i++) {
      vResumenGastos.push({
        CODIGO_CDRG: 0,
        CODIGO_CD: 0,
        DESCRIPCION_CDRG: (<HTMLInputElement>vListaGastosTabla[i].children[0]).innerText,
        MONTO_CDRG: parseFloat(((<HTMLInputElement>vListaGastosTabla[i].children[1]).innerText).replace(/,/gi, ''))
      });
    }

    /*2. Resumen de Lista Cobranza */
    let vListCobranzaTabla = (<HTMLInputElement>document.getElementById("dtResumenpagoslistacobranzabody")).children;

    for (let i = 0; i < vListCobranzaTabla.length; i++) {
      vResumenListaCobranza.push({
        CODIGO_CDRLB: 0,
        CODIGO_CD: 0,
        CODIGO_PERSONAL_CDRLB: parseInt(((<HTMLInputElement>vListCobranzaTabla[i].children[0]).innerText).split('-')[0]),
        DESCRIPCION_CDRLB: (<HTMLInputElement>vListCobranzaTabla[i].children[0]).innerText,
        MONTO_EFECTIVO_CDRLB: parseFloat(((<HTMLInputElement>vListCobranzaTabla[i].children[1]).innerText).replace(/,/gi, '')),
        MONTO_DEPOSITO_CDRLB: parseFloat(((<HTMLInputElement>vListCobranzaTabla[i].children[2]).innerText).replace(/,/gi, ''))
      });
    }

    let objCierreCaja: CierreDiario = {
      ACCION: 1,
      CODIGO_CD: 0,
      FECHA_CIERRE_CD: pFechaCierre,
      TOTAL_OFICINA_CD: parseFloat(pTotaloficina.replace(/,/gi, '')),
      TOTAL_LISTA_COBRANZA_CD: parseFloat(pTotalLista.replace(/,/gi, '')),
      TOTAL_GASTOS_CD: parseFloat(pTotalGastos.replace(/,/gi, '')),
      TOTAL_CIERRE_CD: parseFloat(pTotalcierre.replace(/,/gi, '')),
      RESUMEN_COBRANZA_OFICINA: vResumenOficina,
      RESUMEN_GASTOS: vResumenGastos,
      RESUMEN_LISTA_COBRANZA: vResumenListaCobranza
    }

    this.NotificacionPregunta("question", 'Cierre de Caja Diario', '¿Estas seguro de realizar el cierre de caja diario?', objCierreCaja);
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
        this.vBloquearBoton = true;
        this.cierrecajaService.CerrarCajaDiario(pObjArray).subscribe(resp => {
          this.vBloquearBoton = false;
          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Cierre de Caja Diario', resp[0].ME);
            this.router.navigate(['/pages/listarcierrediario']);
          }
          else if (parseInt(resp[0].RE) === 0) {
            this.NotificacionGeneral('warning', 'Cierre de Caja Diario', resp[0].ME);
          }
          else if (parseInt(resp[0].RE) === -1) {
            this.NotificacionGeneral('warning', 'Cierre de Caja Diario', resp[0].ME);
          }
          else {
            this.NotificacionGeneral('error', 'Cierre de Caja Diario', "Ocurrio un inconveniente al realizar el cierre diario de caja");
          }
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
