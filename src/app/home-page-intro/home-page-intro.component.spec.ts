import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageIntroComponent } from './home-page-intro.component';

describe('HomePageIntroComponent', () => {
  let component: HomePageIntroComponent;
  let fixture: ComponentFixture<HomePageIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
