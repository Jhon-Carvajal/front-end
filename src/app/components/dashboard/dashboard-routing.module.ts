import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './personas/perfil/perfil.component';

import { FincalComponent } from './fincal/fincal.component';
import { CrearFComponent } from './fincal/crearf/crearf.component';

import { LotelComponent } from './lotel/lotel.component';
import { CrearlComponent } from './lotel/crearl/crearl.component';

import { PlanNutricionComponent } from './nutricion/plan-nutricion/plan-nutricion.component';
import { PlanFumigacionComponent } from './fumigacion/plan-fumigacion/plan-fumigacion.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,
    children:
  [ 
    { path: '', component : InicioComponent },
    { path: 'finca',component: FincalComponent },
    { path: 'crear',component:CrearFComponent},
    { path: 'lote',component: LotelComponent},
    { path: 'crear-lote', component:CrearlComponent},
    { path: 'perfil', component:PerfilComponent},
    { path: 'plan-nutricion', component:PlanNutricionComponent},
    { path: 'plan-fumigacion', component:PlanFumigacionComponent},
  ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
