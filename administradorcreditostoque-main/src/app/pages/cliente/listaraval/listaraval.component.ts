import { Component, OnInit } from '@angular/core';
import { AvalService } from 'src/app/services/aval.service';
import { NuevoAval } from '../../../models/nuevoAval.model';

declare const $:any;

@Component({
  selector: 'app-listaraval',
  templateUrl: './listaraval.component.html',
  styles: [
  ]
})
export class ListaravalComponent implements OnInit {

  public listarAvales :NuevoAval [] = [];
  constructor(private avalServicio: AvalService) { }

  ngOnInit(): void {
    this.getListarAlvalAll();
  }

  getListarAlvalAll():void{
    this.avalServicio.ListarAval(1,0).subscribe( resp => {
      this.listarAvales = resp;

      setTimeout(function(){
        $("#tdAvales").DataTable({
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
}
