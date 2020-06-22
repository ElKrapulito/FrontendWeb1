import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses-slide',
  templateUrl: './courses-slide.component.html',
  styleUrls: ['./courses-slide.component.css']
})
export class CoursesSlideComponent implements OnInit {

  constructor(
    private courseService:CourseService
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  courses:Course[]
  getCourses(){
    this.courseService.getCourses()
    .subscribe(
      courses => {
        this.courses = courses;
      }
    )
  }

}
