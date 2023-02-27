import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGroupsComponent } from './cart-groups.component';

describe('CartGroupsComponent', () => {
  let component: CartGroupsComponent;
  let fixture: ComponentFixture<CartGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
