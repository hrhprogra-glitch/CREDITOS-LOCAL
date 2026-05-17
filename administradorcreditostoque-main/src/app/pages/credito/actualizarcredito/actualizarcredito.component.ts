import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditosService } from '../../../services/creditos.service';
import { ConsultarCreditosporcodigo } from '../../../models/consultarCreditoporcodigo.model';
import { TipoCredito } from '../../../models/tipoCredito.model';
import { ActualizarMontoCredito } from 'src/app/models/actualizarMontocredito.model';

import Swal from 'sweetalert2'

declare const $:any;

@Component({
  selector: 'app-actualizarcredito',
  templateUrl: './actualizarcredito.component.html',
  styles: [
  ]
})
export class ActualizarcreditoComponent implements OnInit {

  public listarCreditos :ConsultarCreditosporcodigo [] = [];
  public listarTipoCredito : TipoCredito[] = [];
  constructor(private route: ActivatedRoute,private router:Router,private creditoServicio: CreditosService) { }

  ngOnInit(): void {
    this.ListarTipoCredito();
    const id = this.route.snapshot.params['idcredito'];
    this.getConsultarInformacionCreditoPorCodigo(id);
  }

  getConsultarInformacionCreditoPorCodigo(pIdCredito:number): void{
    this.creditoServicio.getConsultarCreditosPorCodigo(2,pIdCredito,0).subscribe( resp => {
      this.listarCreditos = resp;
      
      setTimeout(function(){
        $("#tListarCreditosCronogramas").DataTable({
          "info": true,
          "paging": true,
          "searching": true,
          "responsive": true, "lengthChange": false, "autoWidth": false,
          language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Resultado _START_ hasta _END_ de _TOTAL_ Registros",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "",
            "searchPlaceholder": "Buscar Cuota ...",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "ordering": false,
        });
      }, 2000);

    });
  }

  ListarTipoCredito()  {
    this.creditoServicio.ListarTipoCredito(1).subscribe( resp => {
      console.log(resp);
      this.listarTipoCredito = resp;
      return this.listarTipoCredito;
    });
  }

  ActualizarMontoCuota(pActualizarCuota:any){
    const selectEl = pActualizarCuota.target;

    if((selectEl.parentElement.parentElement.children[7].children[0]).value === ''){
      this.NotificacionGeneral('warning','Actualizar Crédito',"Ingrese un monto correcto para pagar la cuota");
      return ;
    }
    else if(parseFloat((selectEl.parentElement.parentElement.children[7].children[0]).value) <= 0){
      this.NotificacionGeneral('warning','Actualizar Crédito',"Ingrese un monto correcto para pagar la cuota");
      return ;
    }
    else if(parseFloat((selectEl.parentElement.parentElement.children[7].children[0]).value) > parseFloat(selectEl.getAttribute('data-mons'))){
      this.NotificacionGeneral('warning','Actualizar Crédito',"El monto de la cuota a pagar es mayor al saldo");
      return ;
    }
    let actualizarCredito: ActualizarMontoCredito[]=[{
      ACCION:2,
      CODIGO_CREDITO:selectEl.getAttribute('data-codc'),
      NUM_CUOTA:selectEl.getAttribute('data-numc'),
      MONTO_A_PAGAR :(selectEl.parentElement.parentElement.children[7].children[0]).value ,
      COD_USUARIO:2
    }]


    this.creditoServicio.ActualizarCreditoCuota(actualizarCredito).subscribe( resp => {

      if (parseInt(resp[0].RE) ===1){
        this.router.navigate(['/pages/listarcredito']);
      }
      else {
        this.NotificacionGeneral('error','Actualizar Crédito',"Ocurrio un inconveniente al actualizar el monto de la cuota");
      }
    });
  }

  NotificacionGeneral(pIcon:any, pTitle:any, pMensaje:any) {
    Swal.fire({
        icon: pIcon,
        title: pTitle,
        text: pMensaje
    });
}
}
