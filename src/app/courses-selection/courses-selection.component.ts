import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../interfaces/course';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses-selection',
  templateUrl: './courses-selection.component.html',
  styleUrls: ['./courses-selection.component.css']
})
export class CoursesSelectionComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //this.getCourses();
  }

  url = `${environment.apiUrl}/course`;

  @Input() courses:Course[]
  getCourses(){
    this.http.get<Course[]>(this.url)
    .subscribe(
      courses => {
        this.courses = courses;
      }
    );
  }

}
