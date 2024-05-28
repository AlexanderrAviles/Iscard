import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosDetallePremiumPage } from './beneficios-detalle-premium.page';

describe('BeneficiosDetallePremiumPage', () => {
  let component: BeneficiosDetallePremiumPage;
  let fixture: ComponentFixture<BeneficiosDetallePremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosDetallePremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
