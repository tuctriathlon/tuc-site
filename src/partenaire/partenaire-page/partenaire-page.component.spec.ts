import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenairePageComponent } from './partenaire-page.component';

describe('PartenairePageComponent', () => {
  let component: PartenairePageComponent;
  let fixture: ComponentFixture<PartenairePageComponent>;

  beforeEach(async(() => {
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
