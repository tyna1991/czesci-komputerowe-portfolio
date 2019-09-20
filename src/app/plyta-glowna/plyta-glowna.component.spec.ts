import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlytaGlownaComponent } from './plyta-glowna.component';

describe('PlytaGlownaComponent', () => {
  let component: PlytaGlownaComponent;
  let fixture: ComponentFixture<PlytaGlownaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlytaGlownaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlytaGlownaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
