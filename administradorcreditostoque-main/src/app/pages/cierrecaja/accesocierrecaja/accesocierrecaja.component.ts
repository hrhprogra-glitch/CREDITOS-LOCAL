import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-accesocierrecaja',
  templateUrl: './accesocierrecaja.component.html',
  styleUrls: ['./accesocierrecaja.component.css']
})
export class AccesocierrecajaComponent {

  public vgACCION_TEXTO:string = '';
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    

    this.route.paramMap.subscribe((params: ParamMap) => {
      const vAccionRegresar = this.route.snapshot.params['idaccion'];
      if(parseInt(vAccionRegresar) === 3){
        this.vgACCION_TEXTO = "Acceso Cierre Utilidad";
      }
      else if (parseInt(vAccionRegresar) === 2){
        this.vgACCION_TEXTO = "Acceso Cierre Saldos Morosos";
      }
      else{
        this.vgACCION_TEXTO = "Acceso Cierre Saldos";
      }
    })

    
  }
  onClickAccesoCierreCaja(pUsuario:string, pPassword: string){

    if (pUsuario == 'cierrecaja' && pPassword == 'ehm54321'){
      const vAccionRegresar = this.route.snapshot.params['idaccion'];
      if(parseInt(vAccionRegresar) === 3){
        this.router.navigate(['/pages/cierreutilidad','-','-']);
      }
      else{
        this.router.navigate(['/pages/cierresaldos',vAccionRegresar,'-','-']);
      }
    }
    else {
      this.NotificacionGeneral('warning', 'Acceso Denegado', "Ingrese correctamente los accesos");
    }
  }

  NotificacionGeneral(pIcon: any, pTitle: any, pMensaje: any) {
    Swal.fire({
      icon: pIcon,
      title: pTitle,
      text: pMensaje
    });
  }

}
