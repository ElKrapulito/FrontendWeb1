import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../interfaces/course';
import { CourseService } from '../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Topic } from '../interfaces/topic';


@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {

  isAdmin: boolean;
  hasJoin:boolean;
  course: Course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data.course;
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    this.compareCourse();
    window.scrollTo(0, 0);
  }


  addNewTopic(topic: Topic) {
    this.course.topics.push(topic);
  }

  joinCourse() {
    const userId = this.userService.decode(sessionStorage.getItem('userInSession')).sub;
    this.userService.joinToCourse(userId, this.course)
      .subscribe(result => {
        //console.log(result);
        this.hasJoin = true;
        const courses = JSON.parse(sessionStorage.getItem('userCourses')) as Course[]
        courses.push(this.course);
        sessionStorage.setItem('userCourses',JSON.stringify(courses))
      });
  }

  compareCourse(){
    const courses = JSON.parse(sessionStorage.getItem('userCourses')) as Course[];
    if(courses.find(course => course.id == this.course.id)){
      this.hasJoin = true;
    } else {
      this.hasJoin = false;
    }
  }

}
