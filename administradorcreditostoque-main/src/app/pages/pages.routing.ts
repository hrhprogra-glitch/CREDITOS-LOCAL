import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { GestionarclienteComponent } from "./cliente/gestionarcliente/gestionarcliente.component";
import { ListarclienteComponent } from "./cliente/listarcliente/listarcliente.component";
import { ActualizarcreditoComponent } from "./credito/actualizarcredito/actualizarcredito.component";
import { GestionarcreditoComponent } from "./credito/gestionarcredito/gestionarcredito.component";
import { ListarcreditoComponent } from "./credito/listarcredito/listarcredito.component";
import { PagesComponent } from "./pages.component";
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { ActualizaclienteComponent } from './cliente/actualizacliente/actualizacliente.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CuadernocobranzaComponent } from './credito/cuadernocobranza/cuadernocobranza.component';
import { CuadernocobranzahistorialComponent } from './credito/cuadernocobranzahistorial/cuadernocobranzahistorial.component';
import { ListaravalComponent } from './cliente/listaraval/listaraval.component';
import { NuevoavalComponent } from "./cliente/nuevoaval/nuevoaval.component";
import { ActualizaravalComponent } from "./cliente/actualizaraval/actualizaraval.component";
import { ActualizarcreditoclienteComponent } from "./credito/actualizarcreditocliente/actualizarcreditocliente.component";
import { CuadernocobranzaporcobradorComponent } from "./credito/cuadernocobranzaporcobrador/cuadernocobranzaporcobrador.component";
import { PantallabienvenidaComponent } from "./general/pantallabienvenida/pantallabienvenida.component";
import { CierresaldosComponent } from "./cierrecaja/cierresaldos/cierresaldos.component";
import { CierreutilidadComponent } from "./cierrecaja/cierreutilidad/cierreutilidad.component";
import { AccesocierrecajaComponent } from "./cierrecaja/accesocierrecaja/accesocierrecaja.component";
import { CreditosrefinanciadosComponent } from "./reportes/creditosrefinanciados/creditosrefinanciados.component";
import { CreditosporfechaentregaComponent } from "./reportes/creditosporfechaentrega/creditosporfechaentrega.component";
import { CierrediarioComponent } from "./cierrecaja/cierrediario/cierrediario.component";
import { ListarcierrediarioComponent } from "./cierrecaja/listarcierrediario/listarcierrediario.component";
import { ActualizarcierrediarioComponent } from "./cierrecaja/actualizarcierrediario/actualizarcierrediario.component";

const routes : Routes = [
    {
        path:'pages', 
        component:PagesComponent,
        canActivate:[AutenticacionGuard],
        children:[
            {path:'', component: PantallabienvenidaComponent},
            {path:'dashboard', component: DashboardComponent},
            {path:'listarcliente', component: ListarclienteComponent},
            {path:'listarcredito',component: ListarcreditoComponent},
            {path:'listaraval',component: ListaravalComponent},
            {path:'gestionarcliente',component: GestionarclienteComponent},
            {path:'gestionarcredito',component: GestionarcreditoComponent},
            {path:'actualizarcredito/:idcredito',component: ActualizarcreditoComponent},
            {path:'actualizacliente/:idcliente',component: ActualizaclienteComponent},
            {path:'cuadernocobranza',component: CuadernocobranzaComponent},
            {path:'cuadernocobranzahistorial/:idcredito/:accion/:idperco',component: CuadernocobranzahistorialComponent},
            {path:'nuevoaval',component: NuevoavalComponent},
            {path:'actualizaraval/:idaval',component: ActualizaravalComponent},
            {path:'actualizarcreditocliente/:idcredito',component: ActualizarcreditoclienteComponent},
            {path:'cuadernocobranzaporcobrador/:idpercobran',component: CuadernocobranzaporcobradorComponent},
            {path:'cierresaldos/:idaccion/:fini/:ffin',component: CierresaldosComponent},
            {path:'cierreutilidad/:fini/:ffin',component: CierreutilidadComponent},
            {path:'accesocierrecaja/:idaccion',component: AccesocierrecajaComponent},
            {path:'creditosporfechaentrega',component: CreditosporfechaentregaComponent},
            {path:'creditosrefinanciados',component: CreditosrefinanciadosComponent},
            {path:'cierrediario',component: CierrediarioComponent},
            {path:'listarcierrediario',component: ListarcierrediarioComponent},
            {path:'actualizarcierrediario/:cod', component:ActualizarcierrediarioComponent}
        ]
    },
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class PagesRoutingModule{

}