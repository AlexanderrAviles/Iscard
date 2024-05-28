import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadPremiumPage } from './actividad-premium.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadPremiumPageRoutingModule {}
