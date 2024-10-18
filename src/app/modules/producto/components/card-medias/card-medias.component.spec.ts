import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMediasComponent } from './card-medias.component';

describe('CardMediasComponent', () => {
  let component: CardMediasComponent;
  let fixture: ComponentFixture<CardMediasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMediasComponent]
    });
    fixture = TestBed.createComponent(CardMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
