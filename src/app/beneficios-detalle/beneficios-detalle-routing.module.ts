import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosDetallePage } from './beneficios-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosDetallePageRoutingModule {}
