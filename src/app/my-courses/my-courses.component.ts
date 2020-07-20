import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../interfaces/course';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  @Input()
  courses: Course[];

  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }

}
