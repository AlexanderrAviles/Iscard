import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosEmpresasPremiumPage } from './beneficios-empresas-premium.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosEmpresasPremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosEmpresasPremiumPageRoutingModule {}
