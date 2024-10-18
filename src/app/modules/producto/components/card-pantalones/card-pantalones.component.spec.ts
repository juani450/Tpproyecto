import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPantalonesComponent } from './card-pantalones.component';

describe('CardPantalonesComponent', () => {
  let component: CardPantalonesComponent;
  let fixture: ComponentFixture<CardPantalonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPantalonesComponent]
    });
    fixture = TestBed.createComponent(CardPantalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
