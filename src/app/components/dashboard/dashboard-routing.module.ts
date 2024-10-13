import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FincalComponent } from './fincal/fincal.component';
import { PlanFumigacionComponent } from './fumigacion/plan-fumigacion/plan-fumigacion.component';
import { IaComponent } from './ia/ia.component';
import { MLComponent } from './ml/ml.component';


const routes: Routes = [
  { path:'',component:DashboardComponent,
    children:
  [ 
    { path: '', component : InicioComponent },
    { path: 'finca',component: FincalComponent },
    { path: 'perfil', component:PerfilComponent},
    { path: 'plan-fumigacion', component:PlanFumigacionComponent},
    { path: 'datossen', component: IaComponent },
    { path: 'sugerenciad', component:MLComponent},
    
    
  ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
