import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CoursesSlideComponent } from './courses-slide/courses-slide.component';
import { CoursesSelectionComponent } from './courses-selection/courses-selection.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    CoursesSlideComponent,
    CoursesSelectionComponent,
    CoursesComponent,
    CourseDescriptionComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
