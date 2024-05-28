import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosCategoriaPage } from './beneficios-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosCategoriaPageRoutingModule {}
