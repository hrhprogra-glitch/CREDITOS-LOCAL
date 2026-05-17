import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualizarCreditoCliente } from 'src/app/models/actualizarcreditocliente.model';
import { Credito } from 'src/app/models/credito.model';
import { CreditoCronograma } from 'src/app/models/CreditoCronograma.model';
import { TipoCredito } from 'src/app/models/tipoCredito.model';
import { CreditosService } from '../../../services/creditos.service';

import Swal from 'sweetalert2'
import { ActualizarMontoCredito } from 'src/app/models/actualizarMontocredito.model';
import { CreditoPersonalCobranza } from 'src/app/models/CreditoPersonalCobranza.model';
import { CreditoFormaEntregaupd } from 'src/app/models/creditoFormaEntregaupd.model';
declare const $: any;
declare function InicializarSelect2(): any;
@Component({
  selector: 'app-actualizarcreditocliente',
  templateUrl: './actualizarcreditocliente.component.html',
  styles: [
  ]
})
export class ActualizarcreditoclienteComponent implements OnInit {

  public listarTipoCreditos: TipoCredito[] = [];
  public listarCreditosActualizar: ActualizarCreditoCliente[] = [];
  public listarPersonalCobranzaupd: any[] = [];
  public listarFormaEntrega: any[] = [];
  public vBloquearBoton: boolean = false;


  constructor(private creditosService: CreditosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.ListarTipoCredito();
    const id = this.route.snapshot.params['idcredito'];
    this.getConsultarInformacionCreditoPorCodigo(id);

    setTimeout(function(){
      $('.select2').select2();
    }, 2000);
  }

  ListarTipoCredito() {
    this.creditosService.ListarTipoCredito(1).subscribe(resp => {
      this.listarTipoCreditos = resp;
      return this.listarTipoCreditos;
    });
  }

  getConsultarInformacionCreditoPorCodigo(pIdCredito: number): void {
    this.creditosService.getConsultarCreditosPorCodigoActaulizar(5, pIdCredito, 0).subscribe(resp => {
      this.listarCreditosActualizar = resp;
      this.listarPersonalCobranzaupd = this.listarCreditosActualizar[0].JSON_CREPER;
      this.listarFormaEntrega = this.listarCreditosActualizar[0].JSON_CREENTRE;
    });
  }

  SeleccionarTipoCretido(pTipoCliente: any) {
    const selectEl = pTipoCliente.target;

    let cboDiaSemana = document.getElementById('divDiaCobranzaUpd')!

    if (selectEl.options[selectEl.selectedIndex].getAttribute('data-rds') == 1) {
      cboDiaSemana.className = 'col-md-6 sinone'
    }
    else {
      cboDiaSemana.className = 'col-md-6 nonone'
    }
  }

  SeleccionarTipoCreacionupd() {

    let cbocreditoref= document.getElementById('divCodigocreditorefupd')!

    if (parseInt((<HTMLInputElement>document.getElementById("cbotipocreacionupd")).value) == 1) {
      cbocreditoref.className = 'col-md-6 nonone'
    }
    else {
      cbocreditoref.className = 'col-md-6 sinone'
    }
  }

  onActualizarCredito(pSelectTipoCredito: any) {

    if ((<HTMLInputElement>document.getElementById("spanCodigoClienteCreUpd")).textContent === ' - ') {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "No ha seleccionado cliente para el crédito");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtMontoCreditoUpd")).value === '') {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "No ha ingresado el monto para el crédito");
      return;
    }
    else if (parseFloat((<HTMLInputElement>document.getElementById("txtMontoCreditoUpd")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "El monto del crédito es incorrecto");
      return;
    }
    else if ((<HTMLInputElement>document.getElementById("txtNumCuotaUpd")).value === '') {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "No ha ingresado el número de cuota para el crédito");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("txtNumCuotaUpd")).value) <= 0) {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "El número de cuota es incorrecta");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cboTipoPagoUpd")).value) === 0) {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "No ha seleccionado el tipo de pago para el crédito");
      return;
    }
    else if (parseInt((<HTMLInputElement>document.getElementById("cbotipocreacionupd")).value) === 2) {
      if ((<HTMLInputElement>document.getElementById("txtCodigocreditorefupd")).value === '' || parseInt((<HTMLInputElement>document.getElementById("txtCodigocreditorefupd")).value) <= 0) {
        this.NotificacionGeneral('warning', 'Actualizar Crédito', "Ingrese correctamente el campo código de crédito refinanciado");
        return;
      }
    }

    this.vBloquearBoton = true;
    let detalleCredito: CreditoCronograma[] = [];
    let creditoPersonalCobranza: CreditoPersonalCobranza[] = [];
    
    let arrayPersonalcobranza: number[] = $('#cboPersonalCobranzaupd').val();

    for (var index in arrayPersonalcobranza) {
      creditoPersonalCobranza.push({
        CODIGO_CREDITO:parseInt((<HTMLInputElement>document.getElementById("h3CodigoCredito")).textContent!),
        CODIGO_PERSONAL_COBRANZA:arrayPersonalcobranza[index]
      });
    }

    let nuevoCredito: Credito[] = [{
      ACCION: 6,
      CODIGO_CREDITO: parseInt((<HTMLInputElement>document.getElementById("h3CodigoCredito")).textContent!),
      CODIGO_CLIENTE: parseInt((<HTMLInputElement>document.getElementById("spanCodigoClienteCreUpd")).textContent!),
      CODIGO_TCREDITO: parseInt((<HTMLInputElement>document.getElementById("cboTipoPagoUpd")).value),
      MONTO_CREDITO: parseFloat((<HTMLInputElement>document.getElementById("txtMontoCreditoUpd")).value),
      NUMCUOTA_CREDITO: parseInt((<HTMLInputElement>document.getElementById("txtNumCuotaUpd")).value),
      FECHAINI_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaInicioPagoUpd")).value,
      CREAUSU_CREDITO: 2,
      FECHAFIN_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaFinPagoUpd")).value,
      FECHAENTR_CREDITO: (<HTMLInputElement>document.getElementById("dtFechaEntregaPagoUpd")).value,
      MONTOCUOTA_CREDITO: parseFloat((<HTMLInputElement>document.getElementById("txtMontoPagoCuotaUpd")).value),
      DIACOBRO_CREDITO: parseInt($('#cboTipoPagoUpd').find('option:selected').attr('data-rds')) === 1 ? parseInt((<HTMLInputElement>document.getElementById("cboDiaCobranzaUpd")).value) : 0,
      NOTAS_CREDITO: (<HTMLInputElement>document.getElementById("txtNotasCreditoUpd")).value,
      creditoCronogramas: detalleCredito,
      creditoPersonalCobranza: creditoPersonalCobranza,
      MONTO_UTILIDAD_CREDITO:parseFloat((<HTMLInputElement>document.getElementById("txtMontoUtilidadUpd")).value),
      MONTOPARTIAL_CREDITO:parseFloat((<HTMLInputElement>document.getElementById("txtMontoParcialUpd")).value),
      TIPO_RELACION:parseInt((<HTMLInputElement>document.getElementById("cbotipocreacionupd")).value),
      CODIGO_CREDITO_REF:parseInt((<HTMLInputElement>document.getElementById("cbotipocreacionupd")).value) === 1 ? 0 : parseInt((<HTMLInputElement>document.getElementById("txtCodigocreditorefupd")).value),
      FORMA_ENTREGA:[]
    }]

    this.creditosService.RegistrarCreditos(nuevoCredito).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.NotificacionGeneral('success', 'Actualizar Crédito', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Actualizar Crédito', resp[0].ME);
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

  onClickRefinanciarCredito(pCodigoCredito: number) {

    let actualizarCredito: ActualizarMontoCredito[] = [{
      ACCION: 7,
      CODIGO_CREDITO: pCodigoCredito,
      NUM_CUOTA: 0,
      MONTO_A_PAGAR: 0,
      COD_USUARIO: 2
    }]

    this.NotificacionPregunta('question', 'Actualizar Crédito', '¿Estas seguro de Refinanciar el Crédito?', 'NotificacionPregunta', actualizarCredito);
  }

  onClickActualizarListadoCobranzaCredito(pCodigoCredito: number) {

    let actualizarCredito: ActualizarMontoCredito[] = [{
      ACCION: 8,
      CODIGO_CREDITO: pCodigoCredito,
      NUM_CUOTA: 0,
      MONTO_A_PAGAR: 0,
      COD_USUARIO: 2
    }]

    this.NotificacionPregunta('question', 'Actualizar Crédito', '¿Estas seguro de generar listado de cobranzas pendientes?', 'NotificacionPregunta', actualizarCredito);
  }

  onClickActualizarSaldosCobranzaCredito(pCodigoCredito: number) {

    let actualizarCredito: ActualizarMontoCredito[] = [{
      ACCION: 9,
      CODIGO_CREDITO: pCodigoCredito,
      NUM_CUOTA: 0,
      MONTO_A_PAGAR: 0,
      COD_USUARIO: 2
    }]

    this.NotificacionPregunta('question', 'Actualizar Crédito', '¿Estas seguro de actualizar los saldos del Crédito?', 'NotificacionPregunta', actualizarCredito);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onClickGuardarFormaentrega(pCodigocre:number, pIdtipoen:string, pMonto:string, pNotas:string){

    if (pMonto.trim() === '' || parseFloat(pMonto)<=0) {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "Ingrese correctamente el monto de la forma de entrega");
      return;
    }
    else if (pNotas.trim() === '') {
      this.NotificacionGeneral('warning', 'Actualizar Crédito', "Ingrese correctamente las notas de la forma de entrega");
      return;
    }

    let objInsert : CreditoFormaEntregaupd = {
      ACCION:1,
      CODIGO_CREDITO: pCodigocre ,
      CODIGO_CREDITO_E:0,
      CODIGO_ENTREGA:parseInt(pIdtipoen)  ,
      MONTO_ENTREGA:parseFloat(pMonto) ,
      NOTAS_ENTREGA:pNotas
    }

    this.creditosService.InsertarEliminarformaentrega(objInsert).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.NotificacionGeneral('success', 'Actualizar Crédito', resp[0].ME);
        this.Listarformaentrega(pCodigocre);
      }
      else {
        this.NotificacionGeneral('error', 'Actualizar Crédito', resp[0].ME);
      }
    });
  }

  onClickformapagoEliminar(pCod_cre:number, pCod_forma:number){
    let objInsert : CreditoFormaEntregaupd = {
      ACCION:2,
      CODIGO_CREDITO: pCod_cre ,
      CODIGO_CREDITO_E:pCod_forma,
      CODIGO_ENTREGA:0 ,
      MONTO_ENTREGA:0 ,
      NOTAS_ENTREGA:""
    }

    this.NotificacionPreguntaformapago('question',"Eliminar forma de entrega", "¿Estas segura de eliminar la forma de entrega?",objInsert);
  }

  Listarformaentrega(pCodigocre:number) {
    this.creditosService.Listarformaentrega(1, pCodigocre).subscribe(resp => {
      this.listarFormaEntrega = resp;
      return this.listarFormaEntrega;
    });
  }

  NotificacionPregunta(pIcon: any, pTitle: any, pMensaje: any, pAccion: any, pObjArray: any) {
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

        this.creditosService.ActualizarCreditoCuota(pObjArray).subscribe(resp => {

          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Actualizar Crédito', "Se proceso los datos correctamente");
          }
          else {
            this.NotificacionGeneral('error', 'Actualizar Crédito', resp[0].ME);
          }
        });
      }
    });
  }

  NotificacionPreguntaformapago(pIcon: any, pTitle: any, pMensaje: any, pObjArray: CreditoFormaEntregaupd) {
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

        this.creditosService.InsertarEliminarformaentrega(pObjArray).subscribe(resp => {

          if (parseInt(resp[0].RE) === 1) {
            this.NotificacionGeneral('success', 'Actualizar Crédito', "Se proceso los datos correctamente");
            this.Listarformaentrega(pObjArray.CODIGO_CREDITO);
          }
          else {
            this.NotificacionGeneral('error', 'Actualizar Crédito', resp[0].ME);
          }
        });
      }
    });
  }

}
