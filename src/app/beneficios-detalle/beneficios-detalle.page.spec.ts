import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosDetallePage } from './beneficios-detalle.page';

describe('BeneficiosDetallePage', () => {
  let component: BeneficiosDetallePage;
  let fixture: ComponentFixture<BeneficiosDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BeneficiosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
