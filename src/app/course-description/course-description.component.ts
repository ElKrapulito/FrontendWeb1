import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../interfaces/course';
import { CourseService } from '../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.getCourse();
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  @Input() course:Course;

  getCourse(){
    const courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId)
      .subscribe(
        course => {
          this.course = course;
        }
      )
  }

}
