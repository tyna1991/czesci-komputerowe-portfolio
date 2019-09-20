import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KartaGraficznaComponent } from './karta-graficzna.component';

describe('KartaGraficznaComponent', () => {
  let component: KartaGraficznaComponent;
  let fixture: ComponentFixture<KartaGraficznaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KartaGraficznaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KartaGraficznaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
