import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosCategoriaPremiumPage } from './beneficios-categoria-premium.page';

describe('BeneficiosCategoriaPremiumPage', () => {
  let component: BeneficiosCategoriaPremiumPage;
  let fixture: ComponentFixture<BeneficiosCategoriaPremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosCategoriaPremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
