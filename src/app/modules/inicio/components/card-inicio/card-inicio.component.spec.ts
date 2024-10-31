import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInicioComponent } from './card-inicio.component';

describe('CardInicioComponent', () => {
  let component: CardInicioComponent;
  let fixture: ComponentFixture<CardInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardInicioComponent]
    });
    fixture = TestBed.createComponent(CardInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
