import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZasilaczComponent } from './zasilacz.component';

describe('ZasilaczComponent', () => {
  let component: ZasilaczComponent;
  let fixture: ComponentFixture<ZasilaczComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZasilaczComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZasilaczComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
