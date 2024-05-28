import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosDetallePremiumPageRoutingModule } from './beneficios-detalle-premium-routing.module';

import { BeneficiosDetallePremiumPage } from './beneficios-detalle-premium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosDetallePremiumPageRoutingModule
  ],
  declarations: [BeneficiosDetallePremiumPage]
})
export class BeneficiosDetallePremiumPageModule {}
