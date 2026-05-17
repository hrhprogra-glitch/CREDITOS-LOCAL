import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaCliente } from 'src/app/models/clienteConsulta.model';
import { ClientesService } from '../../../services/clientes.service';
import { ConsultarCreditosporcliente } from '../../../models/consultarCreditoporcliente.model';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

declare const $: any;

@Component({
  selector: 'app-listarcliente',
  templateUrl: './listarcliente.component.html',
  styles: [
  ]
})
export class ListarclienteComponent implements OnInit, OnDestroy {
  public listarClientes: ConsultaCliente[] = [];
  public listarClientesCreditos: ConsultarCreditosporcliente[] = [];
  constructor(private clienteService: ClientesService, private chRef: ChangeDetectorRef) { }

  public dtOptionsLC: DataTables.Settings = {};
  public dtTriggerLC: Subject<any> = new Subject();
  public vClientecreditos: number = 0;
  public vgCliente : number = 0;
  public vgClienteNombre : string = "";

  public listarSeguimiento: any[] = [];
  
  ngOnInit(): void {
    this.getConsultarClientes();
  }

  ngOnDestroy(): void {
    this.dtTriggerLC.unsubscribe();
  }
  getConsultarClientes(): void {
    this.dtOptionsLC = {

      "responsive": true, "lengthChange": true, "autoWidth": false,
      "paging": true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/es_es.json'
      },
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    }

    this.clienteService.getGestionarClienteConsultas(1, 0).subscribe(resp => {
      this.listarClientes = resp;
      this.chRef.detectChanges();

      this.dtTriggerLC.next();

    });
  }

  onCliclVerCreditosdelCliente(pCodCliente: number, pNameCliente:string) {
    this.vgClienteNombre = pNameCliente;
    this.clienteService.getConsultarCreditosPorCliente(3, 0, pCodCliente).subscribe(resp => {
      this.listarClientesCreditos = resp;

    });
  }

  onClienteAbrirSeguimiento(pCodigoCliente:number, pNameCliente:string){
    this.vgCliente = pCodigoCliente;
    this.vgClienteNombre = pNameCliente;

    this.clienteService.getListarClienteseguimiento(1, pCodigoCliente).subscribe(resp => {
      this.listarSeguimiento = resp;
    });
  }

}
