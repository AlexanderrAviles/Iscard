import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosCategoriaPremiumPageRoutingModule } from './beneficios-categoria-premium-routing.module';

import { BeneficiosCategoriaPremiumPage } from './beneficios-categoria-premium.page';
import { SharedModule } from '../side-menu/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosCategoriaPremiumPageRoutingModule,
    SharedModule,
  ],
  declarations: [BeneficiosCategoriaPremiumPage]
})
export class BeneficiosCategoriaPremiumPageModule {}
