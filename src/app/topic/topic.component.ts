import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Topic } from '../interfaces/topic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: Topic;

  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTopic();
    window.scrollTo(0,0);
  }

  getTopic() {
    const topicId = +this.route.snapshot.paramMap.get('id');
    this.topicService.getTopic(topicId)
      .subscribe(
        topic => {
          this.topic = topic;
        }
      )
  }

}
