import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FincalComponent } from './fincal/fincal.component';
import { PlanNutricionComponent } from './nutricion/plan-nutricion/plan-nutricion.component';
import { PlanFumigacionComponent } from './fumigacion/plan-fumigacion/plan-fumigacion.component';
import { PlantulaComponent } from './plantula/plantula.component';



@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    FincalComponent,
    PlanNutricionComponent,
    PlanFumigacionComponent,
    PlantulaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule,
  ]
})
export class DashboardModule { }
