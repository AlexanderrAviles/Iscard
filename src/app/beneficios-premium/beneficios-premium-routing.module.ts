import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosPremiumPage } from './beneficios-premium.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosPremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosPremiumPageRoutingModule {}
