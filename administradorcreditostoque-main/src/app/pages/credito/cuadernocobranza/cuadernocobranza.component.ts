import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActualizarCuadernoCobranza } from 'src/app/models/actualizarCuadernoCobranza.model';
import { CuadernoCobranza } from 'src/app/models/cuadernoCobranza.model';
import { CuadernocobranzaService } from 'src/app/services/cuadernocobranza.service';


import Swal from 'sweetalert2'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { CreditosService } from 'src/app/services/creditos.service';



import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CuadernoCobranzaNotas } from 'src/app/models/cuadernoCobranzaNotas.model';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-cuadernocobranza',
  templateUrl: './cuadernocobranza.component.html',
  styles: [
  ]
})
export class CuadernocobranzaComponent implements OnInit , OnDestroy{

  public lisCuadernoCobranza: CuadernoCobranza[] = [];
  public vigenciaCuadernoCobranza: string = '';
  public listarCuadernoCobranzaRangoFecha: any = [];

  @ViewChild('cerrarModal') cerrarModal!: ElementRef;
  @ViewChild('cerrarModalCodigo') cerrarModalCodigo!: ElementRef;
  @ViewChild('cerrarModalNotas') cerrarModalNotas!: ElementRef;
  @ViewChild('NotasListadoCobranza') NotasListadoCobranza: any;


  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective ,{static: false}) dtElement!: DataTableDirective;

  public vLoader: boolean = false;
  public vBloquearBoton: boolean = false;

  public htmlData: string = "<p>¡Hola, mundo!</p>"
  public Editor :any = ClassicEditorBuild;
  public EditorData: any = ``;

  public config = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize',
      'alignment',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'custombutton', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeBlock', '|',
      'insertTable', '|',
      'undo', 'redo', '|',
      'youtube'
    ]
  }

  public spanNotasDiaCobranza: string = '';

  constructor(private cuadernoCobranzaSer: CuadernocobranzaService,
    private seguridadService: SeguridadService, private creditoServicio: CreditosService, private route: ActivatedRoute,private router:Router,
    private chRef : ChangeDetectorRef) { 
    }

  ngOnInit(): void {
    this.ListarCuadernoCobranza();
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ListarCuadernoCobranza(): void {

    this.dtOptions = {
      
      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      language: {
        url:'//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }
    
    this.cuadernoCobranzaSer.listarCuadernoCobranza(1).subscribe(resp => {
      this.lisCuadernoCobranza = resp;
      this.vigenciaCuadernoCobranza = resp[0].JSON_CREDITOS[0].VIG_CC;
      this.chRef.detectChanges();

      this.dtTrigger.next();
    });
  }

  onClickBuscarCuadernoCobranzaPorFecha() {
    this.cuadernoCobranzaSer.listarCuadernoCobranzaRangoFecha(2, (<HTMLInputElement>document.getElementById("dtFechaIniCuadernoCobranza")).value, (<HTMLInputElement>document.getElementById("dtFechaFinCuadernoCobranza")).value).subscribe(resp => {
      return this.listarCuadernoCobranzaRangoFecha = resp;

    });
  }

  onClickbuscarCuadernoCobranzaPorCodigo(pParametro: any) {
    const selectAval = pParametro.target;
    
    this.cuadernoCobranzaSer.listarCuadernoCobranzaPorCodigocuadernoCobranza(1, parseInt(selectAval.getAttribute('data-codcodico'))).subscribe(resp => {
      this.lisCuadernoCobranza = resp;
      this.vigenciaCuadernoCobranza = resp[0].JSON_CREDITOS[0].VIG_CC;
      this.rerender_datatable();
      this.cerrarModalCodigo.nativeElement.click();

    });
  }

  onClickBuscarCuadernoCobranzaPorCodigoAccesoDirecto(pCodigoCuadernoCobranza: number) {
    
    this.cuadernoCobranzaSer.listarCuadernoCobranzaPorCodigocuadernoCobranza(1, pCodigoCuadernoCobranza).subscribe(resp => {
      this.lisCuadernoCobranza = resp;
      this.vigenciaCuadernoCobranza = resp[0].JSON_CREDITOS[0].VIG_CC;
      this.rerender_datatable();
    });
  }

  rerender_datatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();      
      // dtTrigger la reconstruye
      this.dtTrigger.next();      
    });
  }

  onclickModalActualizarCredito(pParametros: any, pDiaCobranza: string) {
    const selectAval = pParametros.target;
    this.spanNotasDiaCobranza = pDiaCobranza;

    (<HTMLInputElement>document.getElementById("spanEtiquetaPersonal")).textContent = selectAval.getAttribute('data-nomper');
    (<HTMLInputElement>document.getElementById("spanEtiquetaCliente")).textContent = selectAval.getAttribute('data-nomcli');

    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-codcre', selectAval.getAttribute('data-codcre'));
    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-codcli', selectAval.getAttribute('data-codcli'));
    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-codpersoco', selectAval.getAttribute('data-codpersoco'));
    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-codcuaco', selectAval.getAttribute('data-codcuaco'));
    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-accion', selectAval.getAttribute('data-accion'));
    (<HTMLInputElement>document.getElementById("btnActualizarCredito")).setAttribute('data-modifmonto', selectAval.getAttribute('data-modifmonto'));
  }

  onclickActualizarCreditoCliente(pParametros: any) {

    const selectAval = pParametros.target;
    let modificarMonto: number = 0;
    /*Validar que el usuario logeado tenga permiso para modificar un monto del cuaderno de cobranzas */
    modificarMonto = parseInt(selectAval.getAttribute('data-modifmonto'));
    if (modificarMonto === 1 && parseInt(this.seguridadService.menu[0].EMC) === 0) {
      this.NotificacionGeneral('warning', 'Listado de Cobranzas', "El usuario no tiene permiso para modificar montos en el listado de Cobranzas.");
      return;
    }
    this.vBloquearBoton = true;

    let objActualizarCuaCobranza: ActualizarCuadernoCobranza = {
      ACCION: parseInt(selectAval.getAttribute('data-accion')),
      CODIGO_CUADERNO_COBRANZA: parseInt(selectAval.getAttribute('data-codcuaco')),
      CODIGO_CLIENTE: parseInt(selectAval.getAttribute('data-codcli')),
      CODIGO_PERSONAL_COBRANZA: parseInt(selectAval.getAttribute('data-codpersoco')),
      CODIGO_CREDITO: parseInt(selectAval.getAttribute('data-codcre')),
      MONTO_PAGADO: parseFloat((<HTMLInputElement>document.getElementById("txtMontoPagarCuCo")).value)
    }

    this.cuadernoCobranzaSer.ActualizarCuadernoCobranza(objActualizarCuaCobranza).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {
        this.cerrarModal.nativeElement.click();

        this.onClickBuscarCuadernoCobranzaPorCodigoAccesoDirecto(parseInt(selectAval.getAttribute('data-codcuaco')));


      }
      else if (parseInt(resp[0].RE) === 0) {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Listado de Cobranzas', "Ocurrio un inconveniente al actualizar el crédito");
      }
      this.vBloquearBoton = false;
    });

  }

  public openPDFCuadernoCobranza() {
    this.vLoader = true;

    const DATA = document.getElementById('divCuadernoCobranza') as HTMLBodyElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_cuadernoCobranza.pdf`);
      this.vLoader = false;
    });

  }

  public actualizarFechasPendientesCreditos() {
    this.vLoader = true;

    this.creditoServicio.ActualizarFechasPendientesCreditos().subscribe(resp => {
      this.vLoader = false;

    });

  }

  onClickModalNotasCuadernoCobranza(pCuadernoCobranza: number, pNumDia: number, pDia: any) {

    console.log(pDia);
    this.spanNotasDiaCobranza = pDia;

    (<HTMLInputElement>document.getElementById("btnActualizarNotasListadoCobranza")).setAttribute('data-codcuadcobran', pCuadernoCobranza.toString());
    (<HTMLInputElement>document.getElementById("btnActualizarNotasListadoCobranza")).setAttribute('data-diacobranza', pNumDia.toString());

    this.cuadernoCobranzaSer.ListarNotasListadoCobranza(1, pCuadernoCobranza, pNumDia).subscribe(resp => {
      
      if (resp !== null) {
        this.NotasListadoCobranza.editorInstance.setData(resp[0].NOTAS);
      }
      else {
        this.NotasListadoCobranza.editorInstance.setData("");
      }
    });

  }

  onclickGuardarNotasCreditoCliente(pParametros: any) {

    const selectAval = pParametros.target;
    let modificarMonto: number = 0;

    this.vBloquearBoton = true;

    let objActualizarCuaCobranza: CuadernoCobranzaNotas = {
      ACCION: 1,
      CODIGO_CUADERNOCOBRANZA: parseInt(selectAval.getAttribute('data-codcuadcobran')),
      DIASEMANA_CUADERNO_COBRANZA: parseInt(selectAval.getAttribute('data-diacobranza')),
      NOTAS_CUDERNOCOBRANZA_N: this.NotasListadoCobranza.editorInstance.getData(),
    }

    this.cuadernoCobranzaSer.ActualizarCuadernoCobranzaNotas(objActualizarCuaCobranza).subscribe(resp => {
      if (parseInt(resp[0].RE) === 1) {

        this.cerrarModalNotas.nativeElement.click();
      }
      else if (parseInt(resp[0].RE) === 0) {
        this.NotificacionGeneral('warning', 'Listado de Cobranzas', resp[0].ME);
      }
      else {
        this.NotificacionGeneral('error', 'Listado de Cobranzas', "Ocurrio un inconveniente al actualizar las Notas del Listado de Cobranzas");
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
