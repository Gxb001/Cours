import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Home} from './components/home/home';
import {CourseList} from './components/course-list/course-list';
import {CourseDetails} from './components/course-details/course-details';
import {AddCourse} from './components/add-course/add-course';
import {Login} from './components/login/login';
import {authGuard, canActivateAdmin} from './guards/auth-guard';
import {About} from './components/about/about';
import {Register} from './components/register/register';


const routes: Routes = [
  {path: '', component: Home},
  {path: 'courses', component: CourseList},
  {path: 'course/:id', component: CourseDetails, canActivate: [canActivateAdmin]},
  {path: 'add-course', component: AddCourse, canActivate: [canActivateAdmin]},
  {path: 'login', component: Login, canActivate: [authGuard]},
  {path: 'about', component: About},
  {path: 'register', component: Register}, // todo rendre registe accessible only to unauthenticated users
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
