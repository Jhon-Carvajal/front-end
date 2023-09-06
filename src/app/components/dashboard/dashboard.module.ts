import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { HdvpersonaComponent } from './hdvpersona/hdvpersona.component';
import { CrearFincaComponent } from './finca/crear-finca/crear-finca.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    HdvpersonaComponent,
    CrearPersonaComponent,
    CrearFincaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class DashboardModule { }
