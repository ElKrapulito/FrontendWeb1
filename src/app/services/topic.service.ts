import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from '../interfaces/topic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http: HttpClient
  ) { }

  url = `${environment.apiUrl}/topic`

  getTopic(topic: Topic | number) {
    return this.http.get<Topic>(`${this.url}/${topic}`);
  }

  insertTopic(topic: Topic) {
    return this.http.post<Topic>(this.url,
      {
        topicTitle: topic.topicTitle,
        description: topic.description,
        type: topic.type,
        content: topic.content,
        courseId: topic.course.id
      });
  }

}
