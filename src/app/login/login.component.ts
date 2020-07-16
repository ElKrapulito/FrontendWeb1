import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login(username:string, password:string){
    this.userService.logIn({username:username, password:password})
      .subscribe(
        data => {
          sessionStorage.setItem('userInSession',data.access_token);
          const id = this.userService.decode(data.access_token).sub;
          this.userService.getJoinCourses(id)
            .subscribe(user => {
              sessionStorage.setItem('userCourses', JSON.stringify(user.courses));
            });
        }
      );
  }

}
