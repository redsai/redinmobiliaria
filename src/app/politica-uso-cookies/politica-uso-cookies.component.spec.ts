import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaUsoCookiesComponent } from './politica-uso-cookies.component';

describe('PoliticaUsoCookiesComponent', () => {
  let component: PoliticaUsoCookiesComponent;
  let fixture: ComponentFixture<PoliticaUsoCookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaUsoCookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaUsoCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
