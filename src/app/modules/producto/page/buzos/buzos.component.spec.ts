import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzosComponent } from './buzos.component';

describe('BuzosComponent', () => {
  let component: BuzosComponent;
  let fixture: ComponentFixture<BuzosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuzosComponent]
    });
    fixture = TestBed.createComponent(BuzosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
