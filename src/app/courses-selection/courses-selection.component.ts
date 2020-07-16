import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../interfaces/course';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courses-selection',
  templateUrl: './courses-selection.component.html',
  styleUrls: ['./courses-selection.component.css']
})
export class CoursesSelectionComponent implements OnInit {


  @Input() courses:Course[];

  constructor(
    
  ) { }

  ngOnInit(): void {

  }

}
