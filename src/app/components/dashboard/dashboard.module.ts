import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LotelComponent } from './lotel/lotel.component';
import { FincalComponent } from './fincal/fincal.component';
import { CrearlComponent } from './lotel/crearl/crearl.component';
import { CrearFComponent } from './fincal/crearf/crearf.component';
import { PlanFumigacionComponent } from './fumigacion/plan-fumigacion/plan-fumigacion.component';
import { PlanNutricionComponent } from './nutricion/plan-nutricion/plan-nutricion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    LotelComponent,
    FincalComponent,
    CrearlComponent,
    CrearFComponent,
    PlanFumigacionComponent,
    PlanNutricionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatExpansionModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
