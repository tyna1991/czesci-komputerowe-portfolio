import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PojedynczyProduktComponent } from './pojedynczy-produkt.component';

describe('PojedynczyProduktComponent', () => {
  let component: PojedynczyProduktComponent;
  let fixture: ComponentFixture<PojedynczyProduktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PojedynczyProduktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PojedynczyProduktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
