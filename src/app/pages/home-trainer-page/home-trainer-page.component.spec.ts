import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeTrainerPageComponent } from './home-trainer-page.component';

describe('HomeTrainerPageComponent', () => {
  let component: HomeTrainerPageComponent;
  let fixture: ComponentFixture<HomeTrainerPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTrainerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
