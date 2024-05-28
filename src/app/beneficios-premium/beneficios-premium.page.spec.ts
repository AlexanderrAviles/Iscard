import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosPremiumPage } from './beneficios-premium.page';

describe('BeneficiosPremiumPage', () => {
  let component: BeneficiosPremiumPage;
  let fixture: ComponentFixture<BeneficiosPremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosPremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
