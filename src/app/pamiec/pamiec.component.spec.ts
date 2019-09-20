import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PamiecComponent } from './pamiec.component';

describe('PamiecComponent', () => {
  let component: PamiecComponent;
  let fixture: ComponentFixture<PamiecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PamiecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PamiecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
