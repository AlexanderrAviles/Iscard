import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosEmpresasPremiumPage } from './beneficios-empresas-premium.page';

describe('BeneficiosEmpresasPremiumPage', () => {
  let component: BeneficiosEmpresasPremiumPage;
  let fixture: ComponentFixture<BeneficiosEmpresasPremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosEmpresasPremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
