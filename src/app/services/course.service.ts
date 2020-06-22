import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http:HttpClient
  ) { }
  
  url = `${environment.apiUrl}/course`;

  getCoursesByCategory(categoryId:number){
    return this.http.get<Course[]>(`${this.url}/category/${categoryId}`);
  }

  getCourses(){
    return this.http.get<Course[]>(this.url);
  }

  getCourse(courseId:number){
    return this.http.get<Course>(`${this.url}/${courseId}`);
  }

  searchCourses(term:string){
    return this.http.get<Course[]>(`${this.url}/search/${term}`);
  }

}
