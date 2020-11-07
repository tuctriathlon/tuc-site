import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrainerPageComponent } from './home-trainer-page.component';

describe('HomeTrainerPageComponent', () => {
  let component: HomeTrainerPageComponent;
  let fixture: ComponentFixture<HomeTrainerPageComponent>;

  beforeEach(async(() => {
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
