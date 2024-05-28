import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosCategoriaPageRoutingModule } from './beneficios-categoria-routing.module';

import { BeneficiosCategoriaPage } from './beneficios-categoria.page';
import { SharedModule } from '../side-menu/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosCategoriaPageRoutingModule,
    SharedModule,
  ],
  declarations: [BeneficiosCategoriaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BeneficiosCategoriaPageModule { }
