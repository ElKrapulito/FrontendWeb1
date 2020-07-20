import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
  }

  login(username:string, password:string){
    this.userService.logIn({username:username, password:password})
      .subscribe(
        data => {
          sessionStorage.setItem('userInSession',data.access_token);
          const user = this.userService.decode(data.access_token);
          const id = user.sub;
          const isAdmin = user.isAdmin;
          this.userService.getJoinCourses(id)
            .subscribe(user => {
              sessionStorage.setItem('userCourses', JSON.stringify(user.courses));
            });
          if(isAdmin){
            this.courseService.getCoursesByAdminId(id).subscribe( courses => sessionStorage.setItem('adminCourses', JSON.stringify(courses)))
          }
        }
      );
  }

}
