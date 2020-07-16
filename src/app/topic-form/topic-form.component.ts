import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../interfaces/course';
import { TopicService } from '../services/topic.service';
import { Topic } from '../interfaces/topic';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import * as marked from 'marked';
import { Location } from '@angular/common';


@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  course: Course;
  @Output() sendTopic = new EventEmitter<Topic>();
  @Input() topic: Topic;
  isDisplay: boolean = false;
  topicForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.topic = this.route.snapshot.data.topic;
    console.log(this.topic);
    this.getCourse();
    marked.setOptions({
      breaks: true
    })
    this.setForm();
  }

  ngAfterViewInit() {

  }

  setForm() {
    if (this.topic) {
      this.topicForm = this.fb.group({
        topicTitle: [this.topic.topicTitle],
        description: [this.topic.description],
        types: this.fb.group({
          type: [this.topic.type]
        }),
        content: [this.topic.content]
      });
      this.setContent(this.topic.content);
    } else {
      this.topicForm = this.fb.group({
        topicTitle: [''],
        description: [''],
        types: this.fb.group({
          type: ['']
        }),
        content: ['']
      });
    }
  }

  getCourse() {
    const courseId = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId)
      .subscribe(
        course => {
          this.course = course;
        }
      )
  }

  onSubmit() {
    const values = this.topicForm.value;

    if(this.topic){
      this.topic = {
        id: this.topic.id,
        topicTitle: values.topicTitle,
        description: values.description,
        type: values.types.type,
        content: values.content,
      };
      this.topicService.updateTopic(this.topic)
        .subscribe(topic => {
          this.sendTopic.emit(topic);
          console.log('Topic updated!');
          this.location.back();
        });
    } else {
      this.topic = {
        topicTitle: values.topicTitle,
        description: values.description,
        type: values.types.type,
        content: values.content,
        course: this.course
      };
      this.topicService.insertTopic(this.topic)
        .subscribe(topic => {
          this.sendTopic.emit(topic);
          console.log('Topic inserted!');
          this.location.back();
        });
    }
    
  }

  setContent(content: string) {
    document.getElementById('content-preview').innerHTML = marked(content);
  }



}