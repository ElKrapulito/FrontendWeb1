import { Component, OnInit, SecurityContext } from '@angular/core';
import { TopicService } from '../services/topic.service';
import { Topic } from '../interfaces/topic';
import { ActivatedRoute } from '@angular/router';
import * as marked from 'marked';
import { UserService } from '../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: Topic;
  displayForm:boolean;
  isAdmin:boolean;
  urlVideo:SafeResourceUrl
  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private userService:UserService,
    private domSanatizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.decode(sessionStorage.getItem('userInSession')).isAdmin;
    this.displayForm = false;
    this.topic = this.route.snapshot.data.myTopic;
    window.scrollTo(0, 0);
    marked.setOptions({breaks:true});
  }

  ngAfterViewInit(){
    if(this.topic.type == 'Text'){
      this.setContent(this.topic.content);
    }
    if(this.topic.type == 'Video'){
      this.setUrl(this.topic.content);
    }
  }

  setUrl(url:string){
    //this.urlVideo = this.domSanatizer.bypassSecurityTrustUrl();
    const frame = document.getElementById('videoCourse') as HTMLIFrameElement;
    frame.src = this.domSanatizer.sanitize(SecurityContext.RESOURCE_URL, this.domSanatizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${url}`));
    //console.log(this.urlVideo);
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
