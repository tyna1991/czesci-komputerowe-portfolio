import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObudowaComponent } from './obudowa.component';

describe('ObudowaComponent', () => {
  let component: ObudowaComponent;
  let fixture: ComponentFixture<ObudowaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObudowaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObudowaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
