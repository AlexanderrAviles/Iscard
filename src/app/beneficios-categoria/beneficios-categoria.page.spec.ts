import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosCategoriaPage } from './beneficios-categoria.page';

describe('BeneficiosCategoriaPage', () => {
  let component: BeneficiosCategoriaPage;
  let fixture: ComponentFixture<BeneficiosCategoriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
