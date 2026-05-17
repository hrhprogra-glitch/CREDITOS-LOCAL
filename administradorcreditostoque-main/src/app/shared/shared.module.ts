import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoaderComponent } from './loader/loader.component';


@NgModule({
    declarations:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        LoaderComponent,
    ],
    exports:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        LoaderComponent
    ],
    imports:[CommonModule, RouterModule]
})

export class SharedModule{

}