import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FincalComponent } from './fincal/fincal.component';
import { PlanFumigacionComponent } from './fumigacion/plan-fumigacion/plan-fumigacion.component';
import { IaComponent } from './ia/ia.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    FincalComponent,
    PlanFumigacionComponent,
    IaComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule,
    FormsModule,
  ]
})
export class DashboardModule { }
