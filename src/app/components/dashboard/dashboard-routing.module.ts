import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { HdvpersonaComponent } from './hdvpersona/hdvpersona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { CrearFincaComponent } from './finca/crear-finca/crear-finca.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[ 
    {path: '', component : InicioComponent},
    { path: 'postulados',component:HdvpersonaComponent},
    { path: 'postularse',component:CrearPersonaComponent},
    { path: 'finca',component:CrearFincaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
