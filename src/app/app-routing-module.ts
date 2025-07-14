import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Home} from './components/home/home';
import {CourseList} from './components/course-list/course-list';
import {CourseDetails} from './components/course-details/course-details';
import {AddCourse} from './components/add-course/add-course';
import {Login} from './components/login/login';
import {authGuard, canActivateAdmin} from './auth-guard';


const routes: Routes = [
  {path: '', component: Home},
  {path: 'courses', component: CourseList},
  {path: 'course/:id', component: CourseDetails, canActivate: [canActivateAdmin]},
  {path: 'add-course', component: AddCourse, canActivate: [canActivateAdmin]},
  {path: 'login', component: Login, canActivate: [authGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
