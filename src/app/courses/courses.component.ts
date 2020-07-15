import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  isAdmin:boolean
  constructor(
    private userService:UserService
  ) { 
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
  }

  ngOnInit(): void {
  }

}
