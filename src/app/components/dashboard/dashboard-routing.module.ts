import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { FincalComponent } from './fincal/fincal.component';
import { CrearFComponent } from './fincal/crearf/crearf.component';

import { LotelComponent } from './lotel/lotel.component';
import { CrearlComponent } from './lotel/crearl/crearl.component';
import { PerfilComponent } from './personas/perfil/perfil.component';


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
  ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
