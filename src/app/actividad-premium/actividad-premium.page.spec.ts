import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadPremiumPage } from './actividad-premium.page';

describe('ActividadPremiumPage', () => {
  let component: ActividadPremiumPage;
  let fixture: ComponentFixture<ActividadPremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActividadPremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
