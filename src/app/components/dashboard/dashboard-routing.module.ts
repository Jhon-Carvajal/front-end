import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearFincaComponent } from './finca/crear-finca/crear-finca.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[ 
    {path: '', component : InicioComponent},
    { path: 'finca',component:CrearFincaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
