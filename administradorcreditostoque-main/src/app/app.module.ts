import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { RegistrarComponent } from './autenticacion/registrar/registrar.component';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AutenticacionModule,
    HttpClientModule ,
    FormsModule,
    CKEditorModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[CKEditorModule],
})
export class AppModule { }