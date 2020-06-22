import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSlideComponent } from './courses-slide.component';

describe('CoursesSlideComponent', () => {
  let component: CoursesSlideComponent;
  let fixture: ComponentFixture<CoursesSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
