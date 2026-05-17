import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AutenticacionRoutingModule } from "./autenticacion/autenticacion.routing";

import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { PagesRoutingModule } from "./pages/pages.routing";



const routes : Routes = [
    {path:'', redirectTo:'/pages', pathMatch:'full'},  
    {path:'**', component: NopagefoundComponent}
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forRoot(routes),
        PagesRoutingModule,
        AutenticacionRoutingModule
    ],
    exports:[RouterModule]
})

export class AppRoutingModule{

}