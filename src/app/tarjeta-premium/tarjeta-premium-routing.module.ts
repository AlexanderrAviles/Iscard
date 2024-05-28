import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetaPremiumPage } from './tarjeta-premium.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetaPremiumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetaPremiumPageRoutingModule {}
