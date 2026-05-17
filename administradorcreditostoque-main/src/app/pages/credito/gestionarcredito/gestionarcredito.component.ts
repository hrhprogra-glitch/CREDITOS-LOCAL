import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClienteAval } from 'src/app/models/clienteaval.model';
import { CreditosService } from '../../../services/creditos.service';
import { TipoCredito } from '../../../models/tipoCredito.model';
import { CalcularCronograma } from '../../../models/calcularCronograma.model';
import { CronogramaPagos } from '../../../models/cronogramaPagos.model';
import { Credito } from '../../../models/credito.model';
import { CreditoCronograma } from '../../../models/CreditoCronograma.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CreditoPersonalCobranza } from 'src/app/models/CreditoPersonalCobranza.model';
import { CreditoFormaEntrega } from 'src/app/models/creditoFormaEntrega.model';
declare const $: any;

@Component({
  selector: 'app-gestionarcredito',
  templateUrl: './gestionarcredito.component.html',
  styles: [
  ]
})
export class GestionarcreditoComponent implements OnInit {
  public listarClienteCredito: ClienteAval[] = [];
  public listarTipoCredito: TipoCredito[] = [];
  public listarPersonalCobranza: any[] = [];
  public listaCronogramaPagos: CronogramaPagos[] = [];
  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  @ViewChild('cboTipoPago') cboTipoPago!: ElementRef;

  public vBloquearBoton: boolean = false;

  constructor(private creditosService: CreditosService, private router: Router) { }

  ngOnInit(): void {
    this.ListarTipoCredito();
    this.ListarPersonalCobranza();

    setTimeout(function(){
      $('.select2').select2();
    }, 2000);

    this.SeleccionarTipoCreacion();
  }

  OnClickBuscarListarClienteCre(pCodigoCliente: string, pDocCliente: string, pNombRazonsocial: string) {
    if (pCodigoCliente == '') {
      pCodigoCliente = '0';
    }
    if (pDocCliente == '') {
      pDocCliente = '-';
    }
    if (pNombRazonsocial == '') {
      pNombRazonsocial = '-';
    }
    this.ListarClienteCre(pCodigoCliente, pDocCliente, pNombRazonsocial);
  }

  ListarClienteCre(pCodigoCliente: any, pDocumentoCliente: any, pNomRazonSo: any) {
    this.creditosService.listarClienteCre(1, pCodigoCliente, pDocumentoCliente, pNomRazonSo).subscribe(resp => {
      this.listarClienteCredito = resp;
      return this.listarClienteCredito;
    });
  }

  SeleccionarClienteCredito(pClienteAval: any) {
    const selectAval = pClienteAval.target;
    (<HTMLInputElement>document.getElementById("spanCodigoClienteCre")).textContent = selectAval.getAttribute('data-codcli');
    (<HTMLInputElement>document.getElementById("spanNomrsClienteCre")).textContent = selectAval.getAttribute('data-nomrs');
    (<HTMLInputElement>document.getElementById("spanDirClienteCre")).textContent = selectAval.getAttribute('data-dirc');
    this.cerrarModal.nativeElement.click();
  }

  ListarTipoCredito() {
    this.creditosService.ListarTipoCredito(1).subscribe(resp => {
      this.listarTipoCredito = resp;
      return this.listarTipoCredito;
    });
  }

  ListarPersonalCobranza() {
    this.creditosService.ListarPersonalCobranza(2).subscribe(resp => {
      this.listarPersonalCobranza = resp;
      return this.listarPersonalCobranza;
    });
  }

  onChangeFechaInicioPagos(pFechaInicioPagos: any) {
    const selectEl = pFechaInicioPagos.target;

    if ((<HTMLInputElement>document.getElementById("txtMontoCredito")).value === '') {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha ingresado el monto para el crédito");
      return;
    }
    else if (parseFloat((<HTMLInputElement>document.getElementById("txtMontoCredito")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "El monto del crédito es incorrecto");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtNumCuota")).value === '') {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha ingresado el número de cuota para el crédito");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("txtNumCuota")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "El número de cuota es incorrecta");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cboTipoPago")).value) === 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha seleccionado el tipo de pago para el crédito");
      return;
    }


    let calcularCronograma: CalcularCronograma = {
      pNroCuotas: parseInt((<HTMLInputElement>document.getElementById("txtNumCuota")).value),
      pDiasCredito: parseInt(this.cboTipoPago.nativeElement.options[this.cboTipoPago.nativeElement.selectedIndex].getAttribute('data-dtc')),
      pTotalVenta: parseInt((<HTMLInputElement>document.getElementById("txtMontoCredito")).value),
      pFechaInicioPago: (<HTMLInputElement>document.getElementById("dtFechaInicioPago")).value
    }
    

    this.creditosService.CalcularCronogramaPagosCredito(calcularCronograma).subscribe(resp => {
      this.listaCronogramaPagos = resp;
      return this.listaCronogramaPagos;
    });

  }

  SeleccionarTipoCretido(pTipoCliente: any) {
    const selectEl = pTipoCliente.target;

    let cboDiaSemana = document.getElementById('divDiaCobranza')!

    if (selectEl.options[selectEl.selectedIndex].getAttribute('data-rds') == 1) {
      cboDiaSemana.className = 'col-md-6 sinone'
    }
    else {
      cboDiaSemana.className = 'col-md-6 nonone'
    }
  }

  SeleccionarTipoCreacion() {

    let cbocreditoref= document.getElementById('divCodigocreditoref')!

    if (parseInt((<HTMLInputElement>document.getElementById("cbotipocreacion")).value) == 1) {
      cbocreditoref.className = 'col-md-6 nonone'
    }
    else {
      cbocreditoref.className = 'col-md-6 sinone'
    }
  }

  onClickGrabarCredito(pSelectTipoCredito: any) {

    if ((<HTMLInputElement>document.getElementById("spanCodigoClienteCre")).textContent === ' - ') {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha seleccionado cliente para el crédito");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtMontoCredito")).value === '') {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha ingresado el monto para el crédito");
      return;
    }
    else if (parseFloat((<HTMLInputElement>document.getElementById("txtMontoCredito")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "El monto del crédito es incorrecto");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtNumCuota")).value === '') {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha ingresado el número de cuota para el crédito");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("txtNumCuota")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "El número de cuota es incorrecta");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cboTipoPago")).value) === 0) {
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "No ha seleccionado el tipo de pago para el crédito");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cbotipocreacion")).value) === 2) {
      if ((<HTMLInputElement>document.getElementById("txtCodigocreditoref")).value === '' || parseInt((<HTMLInputElement>document.getElementById("txtCodigocreditoref")).value) <= 0) {
        this.NotificacionGeneral('warning', 'Nuevo Crédito', "Ingrese correctamente el campo código de crédito refinanciado");
        return;
      }
    }

    this.vBloquearBoton = true;
    let detalleCredito: CreditoCronograma[] = [];
    let creditoPersonalCobranza: CreditoPersonalCobranza[] = [];
    let creditoFormaentrega: CreditoFormaEntrega[] = [];
    /*
    const table: HTMLTableElement = document.querySelector('#tListarCreditos')!;
    const rows = table.tBodies[0].rows;
    Array.from(rows).forEach((row, idx) => {
      let fechaVenci = Array.from(row.cells).map(td => td)[1];
      let montoCuota = Array.from(row.cells).map(td => td)[2];
      detalleCredito.push({
        CODIGO_CREDITO:0,
        NUMCUOTA_CREDCRO:parseInt(Array.from(row.cells).map(td => td)[0].textContent!)  ,
        FECHAVEN_CREDCRO:(<HTMLInputElement>fechaVenci.children[0]).value,
        MONCUOTA_CREDCRO:parseFloat((<HTMLInputElement>montoCuota.children[0]).textContent!) ,
        CREAUSU_CREDITO:2
      });
    });
    
    if (detalleCredito.length === 0){
      this.NotificacionGeneral('warning','Nuevo Crédito',"No ha generado el cronograma de pagos");
      return;
    }*/

    let arrayPersonalcobranza: number[] = $('#cboPersonalCobranza').val();

    for (var index in arrayPersonalcobranza) {
      creditoPersonalCobranza.push({
        CODIGO_CREDITO:0,
        CODIGO_PERSONAL_COBRANZA:arrayPersonalcobranza[index]
      });
    }

    /*Listado de formas de entrega */

    let listformaentrega = (<HTMLInputElement>document.getElementById("dtTipoentregacreditobody")).children;

    for (let i = 0; i < listformaentrega.length; i++) {     
      creditoFormaentrega.push({
        TIPO_ENTREGA_E: parseInt(((<HTMLInputElement>listformaentrega[i].children[0]).innerText).split('-')[0]),
        MONTO_ENTREGA_E: parseFloat((<HTMLInputElement>listformaentrega[i].children[1]).innerText) ,
        NOTAS_CREDITO_E: (<HTMLInputElement>listformaentrega[i].children[2]).innerText
      });
    }

    if(creditoFormaentrega.length === 0){
      this.NotificacionGeneral('warning', 'Nuevo Crédito', "Ingrese correctamente las formas de entrega del crédito");
        return;
    }

    let nuevoCredito: Credito[] = [{
      ACCION: 4,
      CODIGO_CREDITO: 0,
      CODIGO_CLIENTE: parseInt((<HTMLInputElement>document.getElementById("spanCodigoClienteCre")).textContent!),
      CODIGO_TCREDITO: parseInt((<HTMLInputElement>document.getElementById("cboTipoPago")).value),
      MONTO_CREDITO: parseFloat((<HTMLInputElement>document.getElementById("txtMontoCredito")).value),
      NUMCUOTA_CREDITO: parseInt((<HTMLInputElement>document.getElementById("txtNumCuota")).value),
      FECHAINI_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaInicioPago")).value,
      CREAUSU_CREDITO: 2,
      FECHAFIN_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaFinPago")).value,
      FECHAENTR_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaEntregaPago")).value,
      MONTOCUOTA_CREDITO: parseFloat((<HTMLInputElement>document.getElementById("txtMontoPagoCuota")).value),
      DIACOBRO_CREDITO: parseInt($('#cboTipoPago').find('option:selected').attr('data-rds')) === 1 ? parseInt((<HTMLInputElement>document.getElementById("cboDiaCobranza")).value) : 0,
      NOTAS_CREDITO: (<HTMLInputElement>document.getElementById("txtNotasCredito")).value,
      creditoCronogramas: detalleCredito,
      creditoPersonalCobranza:creditoPersonalCobranza,
      MONTO_UTILIDAD_CREDITO:parseFloat((<HTMLInputElement>document.getElementById("txtMontoUtilidad")).value),
      MONTOPARTIAL_CREDITO:parseFloat((<HTMLInputElement>document.getElementById("txtMontoParcial")).value),
      TIPO_RELACION:parseInt((<HTMLInputElement>document.getElementById("cbotipocreacion")).value),
      CODIGO_CREDITO_REF:parseInt((<HTMLInputElement>document.getElementById("cbotipocreacion")).value) === 1 ? 0 : parseInt((<HTMLInputElement>document.getElementById("txtCodigocreditoref")).value),
      FORMA_ENTREGA:creditoFormaentrega
    }]

    this.creditosService.RegistrarCreditos(nuevoCredito).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.router.navigate(['/pages/listarcredito']);
      }
      else {
        this.NotificacionGeneral('error', 'Nuevo Crédito', "Ocurrio un inconveniente al guardar el crédito");
      }
      this.vBloquearBoton = false;
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
