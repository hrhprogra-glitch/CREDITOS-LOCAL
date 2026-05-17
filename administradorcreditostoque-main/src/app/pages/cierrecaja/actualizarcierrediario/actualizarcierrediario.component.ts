import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CierrecajaService } from 'src/app/services/cierrecaja.service';

@Component({
  selector: 'app-actualizarcierrediario',
  templateUrl: './actualizarcierrediario.component.html',
  styleUrls: ['./actualizarcierrediario.component.css']
})
export class ActualizarcierrediarioComponent {

  public listListacobranza: any[] = [];
  public vgCierrediario: any[] = [];
  public vgResumenOficina: any[] = [];
  public vgResumenlistacobranza: any[] = [];
  public vgResumenGastos: any[] = [];
  public vgFechacierre :string="";

  constructor(private cierrecajaService: CierrecajaService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['cod'];
    this.ListarCierrediarioporcodigo(id);
  }



  ListarCierrediarioporcodigo(pCodigocierre:number): void {

    this.cierrecajaService.ListarCierrecajaDiario(2, pCodigocierre).subscribe(resp => {
      this.vgCierrediario = resp;
      this.vgResumenOficina = resp[0].JSON_CDRCO;
      this.vgResumenlistacobranza = resp[0].JSON_CDRLB;
      this.vgResumenGastos = resp[0].JSON_CDRG;
      this.vgFechacierre = resp[0].FC
    });
  }
}
