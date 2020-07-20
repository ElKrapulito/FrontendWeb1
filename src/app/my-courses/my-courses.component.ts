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

  courses: Course[];
  adminCourses: Course[];
  isAdmin: boolean

  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courses = JSON.parse(sessionStorage.getItem('userCourses')) as Course[];
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    if(this.isAdmin){
      this.adminCourses = JSON.parse(sessionStorage.getItem('adminCourses')) as Course[]
    }
  }

}
