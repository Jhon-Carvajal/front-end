import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LotelComponent } from './lotel/lotel.component';
import { FincalComponent } from './fincal/fincal.component';
import { CrearlComponent } from './lotel/crearl/crearl.component';
import { CrearFComponent } from './fincal/crearf/crearf.component';
import { ActualizarlComponent } from './lotel/actualizarl/actualizarl.component';
import { ActualizarfComponent } from './fincal/actualizarf/actualizarf.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    LotelComponent,
    FincalComponent,
    CrearlComponent,
    CrearFComponent,
    ActualizarlComponent,
    ActualizarfComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class DashboardModule { }
