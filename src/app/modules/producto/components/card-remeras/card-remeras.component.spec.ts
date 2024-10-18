import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRemerasComponent } from './card-remeras.component';

describe('CardRemerasComponent', () => {
  let component: CardRemerasComponent;
  let fixture: ComponentFixture<CardRemerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRemerasComponent]
    });
    fixture = TestBed.createComponent(CardRemerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
