import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { CourseService } from './course.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverService implements Resolve<Observable<Course[]>>{

  constructor(private courseService:CourseService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | Observable<Observable<any[]>> | Promise<Observable<any[]>> {
    const categoryId = +route.paramMap.get('id');
    return this.courseService.getCoursesByCategory(categoryId)
      .pipe(
        map(courses => courses)
      )
  }
}
