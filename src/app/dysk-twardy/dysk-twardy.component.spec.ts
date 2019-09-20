import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyskTwardyComponent } from './dysk-twardy.component';

describe('DyskTwardyComponent', () => {
  let component: DyskTwardyComponent;
  let fixture: ComponentFixture<DyskTwardyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyskTwardyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyskTwardyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
