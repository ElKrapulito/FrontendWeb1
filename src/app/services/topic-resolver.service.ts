import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic';
import { TopicService } from './topic.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicResolverService implements Resolve<Observable<Topic>> {

  constructor(
    private topicService:TopicService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Topic> | Observable<Observable<Topic>> | Promise<Observable<Topic>> {
    const id = +route.paramMap.get('id')
    return this.topicService.getTopic(id).pipe(
      map(myTopic => myTopic)
    )
  }
}
