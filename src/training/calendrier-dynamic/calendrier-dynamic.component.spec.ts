import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierDynamicComponent } from './calendrier-dynamic.component';

describe('CalendrierDynamicComponent', () => {
  let component: CalendrierDynamicComponent;
  let fixture: ComponentFixture<CalendrierDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
