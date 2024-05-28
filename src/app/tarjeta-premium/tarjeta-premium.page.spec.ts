import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaPremiumPage } from './tarjeta-premium.page';

describe('TarjetaPremiumPage', () => {
  let component: TarjetaPremiumPage;
  let fixture: ComponentFixture<TarjetaPremiumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TarjetaPremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
