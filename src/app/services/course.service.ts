import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/course';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  url = `${environment.apiUrl}/course`;

  getCoursesByCategory(categoryId: number) {
    return this.http.get<Course[]>(`${this.url}/category/${categoryId}`);
  }

  getCourses() {
    return this.http.get<Course[]>(this.url);
  }

  getCourse(courseId: number) {
    return this.http.get<Course>(`${this.url}/${courseId}`);
  }

  searchCourses(term: string) {
    return this.http.get<Course[]>(`${this.url}/search/${term}`);
  }

  updateCourse(course: Course): Observable<Course> {
    console.log(course.category.categoryName);
    return this.http.patch<Course>(`${this.url}/${course.id}`, {
      courseTitle: course.courseTitle,
      description: course.description,
      level: course.level,
      imgUrl: course.imgUrl,
      hourLength: course.hourLength,
      categoryId: course.category.id,
      adminId: course.userAdmin.sub
    });
  }

  insertCourse(course: Course) {
    return this.http.post<Course>(this.url, {
      courseTitle: course.courseTitle,
      description: course.description,
      level: course.level,
      imgUrl: course.imgUrl,
      hourLength: course.hourLength,
      categoryId: course.category.id,
      adminId: course.userAdmin.sub
    });
  }

  uploadImageFile(file: File, course: Course): Observable<Course> {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    const fileName = new Date().getTime();
    formData.append('file', file, `${fileName}.${ext}`);
    formData.append('name', file.name);

    return this.http.post<Course>(`${this.url}/image/${course.id}`, formData);
  }

}
