import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetaPremiumPageRoutingModule } from './tarjeta-premium-routing.module';

import { TarjetaPremiumPage } from './tarjeta-premium.page';
import { SharedModule } from '../side-menu/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetaPremiumPageRoutingModule,
    SharedModule
  ],
  declarations: [TarjetaPremiumPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TarjetaPremiumPageModule {}
