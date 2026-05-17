import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cuadernoCobranzaHistorial } from 'src/app/models/cuadernoCibranzaHistorial.model';
import { CreditosService } from 'src/app/services/creditos.service';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2'
import { ActualizarObservacionesCredito } from '../../../models/actualizarObservacionesCredito.model';
import { environment } from '../../../../environments/environment.prod';
import { SeguridadService } from '../../../services/seguridad.service';

import { Subject } from 'rxjs';
@Component({
  selector: 'app-cuadernocobranzahistorial',
  templateUrl: './cuadernocobranzahistorial.component.html',
  styles: [
  ]
})
export class CuadernocobranzahistorialComponent implements OnInit, OnDestroy {

  public listarCreditosHistorial: cuadernoCobranzaHistorial[] = [];
  public editarObservacionCredito: number = 0;
  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  @ViewChild('divCuadernoCobranza') divCuadernoCobranza!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;
  public vLoader: boolean = false;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  constructor(private creditoServicio: CreditosService, private route: ActivatedRoute, private router: Router, private seguridadService: SeguridadService, private chRef: ChangeDetectorRef) { }

  public vCodigoCredito: number = 0;
  public vCantidadRegistros: number = 0;
  public vWidthDiv:string="";
  public vClassRow : string="";
  public vCantidadRegistrosDividido:number =0;

  ngOnInit(): void {
    const id = this.route.snapshot.params['idcredito'];
    this.getConsultarInformacionCreditoPorCodigo(id);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getConsultarInformacionCreditoPorCodigo(pIdCredito: number): void {
    this.dtOptions = {

      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }
    this.creditoServicio.getConsultarCreditosPorCodigoHistoral(4, pIdCredito, 0).subscribe(resp => {
      this.vCodigoCredito = resp[0].CODC;
      this.editarObservacionCredito = parseInt(this.seguridadService.menu[0].EOB);
      this.listarCreditosHistorial = resp;
      this.vCantidadRegistros = this.listarCreditosHistorial[0].JSON_CRONO.length;
      if(this.vCantidadRegistros > 40){
        this.vWidthDiv = "classWidthDiv1400";
        this.vClassRow="col-md-6";
        this.vCantidadRegistrosDividido = this.vCantidadRegistros / 2 ;
        this.vCantidadRegistrosDividido = Math.trunc(this.vCantidadRegistrosDividido);
      }
      else {
        this.vWidthDiv = "classWidthDiv800";
        this.vClassRow="col-md-12";
        this.vCantidadRegistrosDividido =  this.vCantidadRegistros;
      }
      this.chRef.detectChanges();
      this.dtTrigger.next();
    });
  }

  public openPDF() {

    const DATA = <HTMLInputElement>document.getElementById('divCuadernoCobranza');
    const options = {
      background: 'white',
      scale: 3

    };
    html2canvas(DATA, options).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 280;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;


      var doc = new jsPDF('p', 'mm');
      var position = 0;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var imgData = encodeURIComponent(pageData);
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      doc.setLineWidth(5);
      doc.setDrawColor(255, 255, 255);
      doc.rect(0, 0, 210, 295);
      heightLeft -= pageHeight;

      if (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage([imgWidth, imgHeight]);
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        doc.setLineWidth(5);
        doc.setDrawColor(255, 255, 255);
        doc.rect(0, 0, 210, 295);
        heightLeft -= pageHeight;

      } else {

      }

      doc.save(`Orden N`)
    })
  }

  public generateImage() {
    const vDivCC = <HTMLInputElement>document.getElementById('divCuadernoCobranza');
    vDivCC.style.display ="block";
    html2canvas(this.divCuadernoCobranza.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'CronogramaCredito'+this.vCodigoCredito+'.png';
      this.downloadLink.nativeElement.click();
      vDivCC.style.display ="none";
    });
  }
  onclickModalActualizarObservaciones(pParametros: any) {
    const selectAval = pParametros.target;

    (<HTMLInputElement>document.getElementById("spanFechaCredito")).textContent = selectAval.getAttribute('data-fecha');

    (<HTMLInputElement>document.getElementById("btnActualizarComentariosCredito")).setAttribute('data-codigodetacred', selectAval.getAttribute('data-codcred'));
    (<HTMLInputElement>document.getElementById("btnActualizarComentariosCredito")).setAttribute('data-codcre', selectAval.getAttribute('data-codcre'));
  }

  onclickActualizarComentariosCredito(pParametros: any) {

    const selectAval = pParametros.target;
    const Observaciones = (<HTMLInputElement>document.getElementById("txtObservacionesCredito")).value;

    let objActualizarCuaCobranza: ActualizarObservacionesCredito = {
      ACCION: 5,
      CODIGO_DETALLE_CRONO: parseInt(selectAval.getAttribute('data-codigodetacred')),
      OBSERVACIONES: (<HTMLInputElement>document.getElementById("txtObservacionesCredito")).value
    }

    this.creditoServicio.ActaulizarObservacionesCronoDeta(objActualizarCuaCobranza).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {

        this.getConsultarInformacionCreditoPorCodigo(parseInt(selectAval.getAttribute('data-codcre')));

        this.cerrarModal.nativeElement.click();
      }
      else {
        this.NotificacionGeneral('error', 'Nuevo Crédito', "Ocurrio un inconveniente al actualizar el crédito");
      }
    });

  }

  onClickRegresar() {
    const vAccionRegresar = this.route.snapshot.params['accion'];
    if (parseInt(vAccionRegresar) === 1) {/*Regresa a la vista de listado de créditos */
      this.router.navigate(['/pages/listarcredito']);
    }
    else if (parseInt(vAccionRegresar) === 2) {/*Regresa a la vista de cuaderno listado de cobranzas */
      this.router.navigate(['/pages/cuadernocobranza']);
    }
    else if (parseInt(vAccionRegresar) === 3) {/*Regresa a la vista de cuaderno listado de cobranzas por cobrador */
    const vCodPersonal = this.route.snapshot.params['idperco'];
      this.router.navigate(['/pages/cuadernocobranzaporcobrador',vCodPersonal]);
    }
  }

  public actualizarFechasPendientesCreditosPorCredito(pParametro: number) {

    this.vLoader = true;
    this.creditoServicio.ActualizarFechasPendientesCreditosPorCredito(pParametro).subscribe(resp => {
      this.getConsultarInformacionCreditoPorCodigo(pParametro);
      this.vLoader = false;
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
