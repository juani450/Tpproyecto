import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuzosComponent } from './card-buzos.component';

describe('CardBuzosComponent', () => {
  let component: CardBuzosComponent;
  let fixture: ComponentFixture<CardBuzosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBuzosComponent]
    });
    fixture = TestBed.createComponent(CardBuzosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
