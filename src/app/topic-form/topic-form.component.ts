import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Course } from '../interfaces/course';
import { TopicService } from '../services/topic.service';
import { Topic } from '../interfaces/topic';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.css']
})
export class TopicFormComponent implements OnInit {

  @Input() course: Course;
  @Output() sendTopic = new EventEmitter<Topic>();
  topic: Topic;
  isDisplay: boolean = false;

  constructor(
    private fb: FormBuilder,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
  }

  topicForm = this.fb.group({
    topicTitle: [''],
    description: [''],
    types: this.fb.group({
      type: ['']
    }),
    content: ['']
  });

  onSubmit() {
    const values = this.topicForm.value;
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
      });
  }

}
