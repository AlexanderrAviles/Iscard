import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosEmpresasPremiumPageRoutingModule } from './beneficios-empresas-premium-routing.module';

import { BeneficiosEmpresasPremiumPage } from './beneficios-empresas-premium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosEmpresasPremiumPageRoutingModule
  ],
  declarations: [BeneficiosEmpresasPremiumPage]
})
export class BeneficiosEmpresasPremiumPageModule {}
