import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosEmpresasPage } from './beneficios-empresas.page';

describe('BeneficiosEmpresasPage', () => {
  let component: BeneficiosEmpresasPage;
  let fixture: ComponentFixture<BeneficiosEmpresasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosEmpresasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
