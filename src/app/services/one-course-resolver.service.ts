import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';
import { map } from 'rxjs/operators';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class OneCourseResolverService implements Resolve<Observable<Course>> {

  constructor(
    private courseService: CourseService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    const id = +route.paramMap.get('id');
    return this.courseService.getCourse(id).pipe(
      map(course => course)
    )
  }
}
