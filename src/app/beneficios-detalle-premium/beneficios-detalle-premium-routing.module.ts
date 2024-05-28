import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosDetallePremiumPage } from './beneficios-detalle-premium.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosDetallePremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosDetallePremiumPageRoutingModule {}
