import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TopicService } from './topic.service';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolveService implements Resolve<Observable<any>> {

  constructor(
    private topicService: TopicService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
    const topicId = +route.paramMap.get('tid');
    return this.topicService.getTopic(topicId).pipe(
      map(topic => topic)
    )
  }
}
