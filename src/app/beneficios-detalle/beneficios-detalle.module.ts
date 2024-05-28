import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosDetallePageRoutingModule } from './beneficios-detalle-routing.module';

import { BeneficiosDetallePage } from './beneficios-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosDetallePageRoutingModule
  ],
  declarations: [BeneficiosDetallePage]
})
export class BeneficiosDetallePageModule {}
