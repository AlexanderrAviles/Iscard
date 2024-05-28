import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosPageRoutingModule } from './beneficios-routing.module';

import { BeneficiosPage } from './beneficios.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosPageRoutingModule,
  ],
  declarations: [BeneficiosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BeneficiosPageModule {}
