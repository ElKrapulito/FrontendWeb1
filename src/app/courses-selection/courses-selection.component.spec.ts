import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSelectionComponent } from './courses-selection.component';

describe('CoursesSelectionComponent', () => {
  let component: CoursesSelectionComponent;
  let fixture: ComponentFixture<CoursesSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
