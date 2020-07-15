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

  isAdmin:boolean;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    window.scrollTo(0,0);
  }

  @Input() course:Course;

  getCourse(){
    const courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId)
    .subscribe(
        course => 
          this.course = course
      )
  }

  addNewTopic(topic:Topic){
    this.course.topics.push(topic);
  }

}
