import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosEmpresasPage } from './beneficios-empresas.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosEmpresasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosEmpresasPageRoutingModule {}
