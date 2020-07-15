import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Course } from '../interfaces/course';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() course: Course;
  @Output() sendCourse = new EventEmitter<Course>();
  isEdit: boolean = false;
  categories: Category[];
  courseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.setForm();
  }


  setForm() {
    if (this.course) {
      this.courseForm = this.fb.group({
        courseTitle: [this.course.courseTitle],
        description: [this.course.description],
        level: [this.course.level],
        imgUrl: [],
        hourLength: [this.course.hourLength, Validators.pattern('[0-9]+')],
        categoriesIn: this.fb.group({
          category: [this.course.category.id.toString()]
        })
      });
      /*let image = <HTMLImageElement>document.getElementById('uploadImage') as HTMLImageElement;
      console.log(this.course.url);
      image.src = this.course.url;*/
    } else {
      this.courseForm = this.fb.group({
        courseTitle: [''],
        description: [''],
        level: [''],
        imgUrl: [],
        hourLength: ['', Validators.pattern('[0-9]+')],
        categoriesIn: this.fb.group({
          category: ['']
        })
      });
    }
  }


  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        categories => {
          this.categories = categories;
        }
      );
  }

  newCourse: Course
  onSubmit() {
    if (this.course) {
      const values = this.courseForm.value;

      this.course = {
        id: this.course.id,
        courseTitle: values.courseTitle,
        description: values.description,
        level: values.level,
        imgUrl: values.imgUrl,
        hourLength: values.hourLength,
        category: {id:values.categoriesIn.category, categoryName: ""},
        userAdmin: this.userService.decode(sessionStorage.getItem('userInSession'))
      }
      console.log('updating');
      this.courseService.updateCourse(this.course).subscribe(
        course => {
          const input = document.getElementById('imageInput') as HTMLInputElement
          if (input.files.length > 0) {
            this.uploadImageFile(input, course)
          }
          console.log(course);
          this.courseForm.reset();
          this.isEdit = false;
          this.sendCourse.emit(this.course);
        }
      );
    } else {
      const values = this.courseForm.value;

      this.newCourse = {
        courseTitle: values.courseTitle,
        description: values.description,
        level: values.level,
        imgUrl: values.imgUrl,
        hourLength: values.hourLength,
        category: {id:values.categoriesIn.category, categoryName: ""},
        userAdmin: this.userService.decode(sessionStorage.getItem('userInSession'))
      }
      this.courseService.insertCourse(this.newCourse)
        .subscribe(
          course => {
            const input = document.getElementById('imageInput') as HTMLInputElement
            this.uploadImageFile(input, course)
            console.log(course);
            this.courseForm.reset();
            this.isEdit = false;
            this.sendCourse.emit(this.course);
          }
        );
    }
  }

  /* uploadFile(event: EventTarget, course:Course) {
      const eventObj: MSInputMethodContext = event as MSInputMethodContext;
      const target: HTMLInputElement = eventObj.target as HTMLInputElement;
      const file: File = target.files[0];
      this.courseService.uploadImageFile(file, course).subscribe((newImage) => {
        //this.images.push(newImage);
        console.log(newImage);
      });
    }*/

  async uploadImageFile(input: HTMLInputElement, course: Course) {
    const file: File = input.files[0];
    await this.courseService.uploadImageFile(file, course).subscribe((course) => {
      this.course = course;
    });
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        const image = <HTMLImageElement>document.getElementById('uploadImage') as HTMLImageElement;
        image.src = e.target.result.toString();
      }

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

}
