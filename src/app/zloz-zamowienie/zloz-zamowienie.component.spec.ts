import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZlozZamowienieComponent } from './zloz-zamowienie.component';

describe('ZlozZamowienieComponent', () => {
  let component: ZlozZamowienieComponent;
  let fixture: ComponentFixture<ZlozZamowienieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZlozZamowienieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZlozZamowienieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
