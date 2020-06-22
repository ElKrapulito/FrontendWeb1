import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { Subject, Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private courseService: CourseService
  ) { 
    this.courses$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.courseService.searchCourses(term))
    );
  }

  ngOnInit(): void {
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

}
