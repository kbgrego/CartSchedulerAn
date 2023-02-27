import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartGroupsNewComponent } from './cart-groups-new.component';

describe('CartGroupsNewComponent', () => {
  let component: CartGroupsNewComponent;
  let fixture: ComponentFixture<CartGroupsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartGroupsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartGroupsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
