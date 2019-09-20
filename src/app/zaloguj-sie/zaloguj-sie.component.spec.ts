import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZalogujSieComponent } from './zaloguj-sie.component';

describe('ZalogujSieComponent', () => {
  let component: ZalogujSieComponent;
  let fixture: ComponentFixture<ZalogujSieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZalogujSieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZalogujSieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
