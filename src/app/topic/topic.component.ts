import { Component, OnInit } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Topic } from '../interfaces/topic';
import { ActivatedRoute } from '@angular/router';
import * as marked from 'marked';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: Topic;
  displayForm:boolean;
  isAdmin:boolean;
  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    this.displayForm = false;
    this.getTopic();
    window.scrollTo(0, 0);
    marked.setOptions({breaks:true});
  }

  ngAfterViewInit(){
    this.setContent(this.topic.content);
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

  setContent(content:string){
    document.getElementById('content').innerHTML = marked(content);
  }
}
