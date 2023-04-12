import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessesViewComponent } from './witnesses-view.component';

describe('WitnessesViewComponent', () => {
  let component: WitnessesViewComponent;
  let fixture: ComponentFixture<WitnessesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitnessesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitnessesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
