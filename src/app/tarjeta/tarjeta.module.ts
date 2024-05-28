import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavController } from '@ionic/angular';

import { TarjetaPageRoutingModule } from './tarjeta-routing.module';

import { TarjetaPage } from './tarjeta.page';
import { SharedModule } from '../side-menu/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetaPageRoutingModule,
    SharedModule
  ],
  providers: [NavController],
  declarations: [TarjetaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TarjetaPageModule {}
