import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { Subject, Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  inSession:boolean

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) { 
    this.courses$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.courseService.searchCourses(term))
    );
  }

  ngOnInit() {
    if(sessionStorage.getItem('userInSession')){
      this.inSession= true;
    }else {
      this.inSession=false;
    }
    
  }


  isHide:boolean = true;
  toggleHideMenu(){
    this.isHide = !this.isHide;
  }


  isHideInput:boolean = true;
  isTitleHide:boolean = false;
  toggleHideInput(){
    this.isHideInput = !this.isHideInput;
    this.isTitleHide = !this.isTitleHide;
  }

  courses$: Observable<Course[]>;
  private searchTerms = new Subject<string>();

  search(term: string) {
    this.searchTerms.next(term);
  }

  logOut(){
    sessionStorage.clear();
    this.toggleHideMenu();
    this.inSession = false
    this.router.navigate(['/home']);
  }

}
