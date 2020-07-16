import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Course } from '../interfaces/course';
import { CourseService } from '../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  isAdmin: boolean;
  courses: Course[];
  category: Category;
  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    if (sessionStorage.getItem('userInSession')) {
      this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    } else {
      this.isAdmin = false;
    }

  }

  ngOnInit() {
    this.courses = this.route.snapshot.data.courses;
    const categoryId = +this.route.snapshot.paramMap.get('id');
    this.getCategory(categoryId);
  }

  getCourses(id: number) {
    this.courseService.getCoursesByCategory(id)
      .subscribe(courses => {
        this.courses = courses;
        console.log(this.courses);
      })
  }

  getCategory(id: number) {
    this.categoryService.getOneCategory(id)
      .subscribe(category => {
        this.category = category;
      })
  }

}
