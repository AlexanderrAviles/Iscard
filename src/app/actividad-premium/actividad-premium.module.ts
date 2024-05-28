import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadPremiumPageRoutingModule } from './actividad-premium-routing.module';

import { ActividadPremiumPage } from './actividad-premium.page';
import { SharedModule } from '../side-menu/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadPremiumPageRoutingModule,
    SharedModule,
  ],
  declarations: [ActividadPremiumPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ActividadPremiumPageModule {}
