import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ListarclienteComponent } from "./cliente/listarcliente/listarcliente.component";
import { GestionarclienteComponent } from "./cliente/gestionarcliente/gestionarcliente.component";
import { ListarcreditoComponent } from "./credito/listarcredito/listarcredito.component";
import { GestionarcreditoComponent } from "./credito/gestionarcredito/gestionarcredito.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { PagesComponent } from "./pages.component";
import { ActualizarcreditoComponent } from './credito/actualizarcredito/actualizarcredito.component';
import { ActualizaclienteComponent } from './cliente/actualizacliente/actualizacliente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CuadernocobranzaComponent } from './credito/cuadernocobranza/cuadernocobranza.component';
import { CuadernocobranzahistorialComponent } from './credito/cuadernocobranzahistorial/cuadernocobranzahistorial.component';
import { ListaravalComponent } from './cliente/listaraval/listaraval.component';
import { NuevoavalComponent } from './cliente/nuevoaval/nuevoaval.component';
import { ActualizaravalComponent } from './cliente/actualizaraval/actualizaraval.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataTablesModule } from "angular-datatables";
import { CuadernocobranzaporclienteComponent } from './credito/cuadernocobranzaporcliente/cuadernocobranzaporcliente.component';
import { ActualizarcreditoclienteComponent } from './credito/actualizarcreditocliente/actualizarcreditocliente.component';
import { ListadocreditosComponent } from './dashboard/modal/listadocreditos/listadocreditos.component';
import { CuadernocobranzaporcobradorComponent } from './credito/cuadernocobranzaporcobrador/cuadernocobranzaporcobrador.component';
import { PantallabienvenidaComponent } from './general/pantallabienvenida/pantallabienvenida.component';
import { CierreutilidadComponent } from './cierrecaja/cierreutilidad/cierreutilidad.component';
import { CierresaldosComponent } from './cierrecaja/cierresaldos/cierresaldos.component';
import { AccesocierrecajaComponent } from './cierrecaja/accesocierrecaja/accesocierrecaja.component';
import { HistorialseguimientoComponent } from './cliente/historialseguimiento/historialseguimiento.component';
import { CierrediarioComponent } from './cierrecaja/cierrediario/cierrediario.component';
import { CreditosporfechaentregaComponent } from './reportes/creditosporfechaentrega/creditosporfechaentrega.component';
import { CreditosrefinanciadosComponent } from './reportes/creditosrefinanciados/creditosrefinanciados.component';
import { ListarcierrediarioComponent } from './cierrecaja/listarcierrediario/listarcierrediario.component';
import { ActualizarcierrediarioComponent } from './cierrecaja/actualizarcierrediario/actualizarcierrediario.component';

@NgModule({
    declarations:[
        ListarclienteComponent,
        GestionarclienteComponent,
        ListarcreditoComponent,
        GestionarcreditoComponent,
        PagesComponent,
        ActualizarcreditoComponent,
        ActualizaclienteComponent,
        DashboardComponent,
        CuadernocobranzaComponent,
        CuadernocobranzahistorialComponent,
        ListaravalComponent,
        NuevoavalComponent,
        ActualizaravalComponent,
        CuadernocobranzaporclienteComponent,
        ActualizarcreditoclienteComponent,
        ListadocreditosComponent,
        CuadernocobranzaporcobradorComponent,
        PantallabienvenidaComponent,
        CierreutilidadComponent,
        CierresaldosComponent,
        AccesocierrecajaComponent,
        HistorialseguimientoComponent,
        CierrediarioComponent,
        CreditosporfechaentregaComponent,
        CreditosrefinanciadosComponent,
        ListarcierrediarioComponent,
        ActualizarcierrediarioComponent
    ],
    exports:[
        ListarclienteComponent,
        GestionarclienteComponent,
        ListarcreditoComponent,
        GestionarcreditoComponent,
        PagesComponent,
        CuadernocobranzaComponent,
        CuadernocobranzaporcobradorComponent
    ],
    imports:[CommonModule,
        SharedModule,
        AppRoutingModule,
        CKEditorModule,
        DataTablesModule
    ]
})

export class PagesModule{

}