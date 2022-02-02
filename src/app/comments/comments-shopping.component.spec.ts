import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsShoppingComponent } from './comments-shopping.component';

describe('CommentsShoppingComponent', () => {
  let component: CommentsShoppingComponent;
  let fixture: ComponentFixture<CommentsShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsShoppingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
