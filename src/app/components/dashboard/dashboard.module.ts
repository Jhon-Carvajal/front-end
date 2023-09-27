import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TablafincaComponent } from './tablafinca/tablafinca.component';
import { CrearFincaComponent } from './crear-finca/crear-finca.component';
import { TLotesComponent } from './t-lotes/t-lotes.component';
import { CrearLoteComponent } from './crear-lote/crear-lote.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    TablafincaComponent,
    CrearFincaComponent,
    TLotesComponent,
    CrearLoteComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class DashboardModule { }
