import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodatkiComponent } from './dodatki.component';

describe('DodatkiComponent', () => {
  let component: DodatkiComponent;
  let fixture: ComponentFixture<DodatkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodatkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodatkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
