import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosEmpresasPageRoutingModule } from './beneficios-empresas-routing.module';

import { BeneficiosEmpresasPage } from './beneficios-empresas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosEmpresasPageRoutingModule
  ],
  declarations: [BeneficiosEmpresasPage]
})
export class BeneficiosEmpresasPageModule {}
