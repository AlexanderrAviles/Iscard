// shared.module.ts
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SideMenuComponent],
})
export class SharedModule { }
