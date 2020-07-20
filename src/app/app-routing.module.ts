import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';
import { RegisterComponent } from './register/register.component';
import { TopicComponent } from './topic/topic.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { DataResolveService } from './services/data-resolve.service';
import { CourseResolverService } from './services/course-resolver.service';
import { OneCourseResolverService } from './services/one-course-resolver.service';
import { TopicResolverService } from './services/topic-resolver.service';
import { MyCoursesComponent } from './my-courses/my-courses.component';


const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[NoAuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[NoAuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'courses/category/:id',component:CoursesComponent, resolve:{courses: CourseResolverService}},
  {path:'courses/description/:id',component:CourseDescriptionComponent,canActivate:[AuthGuard], resolve:{course:OneCourseResolverService}},
  {path:'courses/description/:id/topic/create',component:TopicFormComponent,canActivate:[AuthGuard]},
  {path:'courses/description/:id/topic/:tid/edit',component:TopicFormComponent,canActivate:[AuthGuard], resolve:{topic: DataResolveService}},
  {path:'topic/:id',component:TopicComponent,canActivate:[AuthGuard],resolve:{myTopic: TopicResolverService}},
  {path:'myCourses/:id',component:MyCoursesComponent,canActivate:[AuthGuard]},
  {path:'', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
