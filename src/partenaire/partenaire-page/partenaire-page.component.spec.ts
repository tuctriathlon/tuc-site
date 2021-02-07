import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartenairePageComponent } from './partenaire-page.component';

describe('PartenairePageComponent', () => {
  let component: PartenairePageComponent;
  let fixture: ComponentFixture<PartenairePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartenairePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
