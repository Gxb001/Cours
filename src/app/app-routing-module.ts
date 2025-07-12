import {NgModule} from '@angular/core';
import {CanActivateFn, Router, RouterModule, Routes} from '@angular/router';
import {Home} from './components/home/home';
import {CourseList} from './components/course-list/course-list';
import {CourseDetails} from './components/course-details/course-details';
import {AddCourse} from './components/add-course/add-course';
import {Login} from './components/login/login';

const canActivate: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('currentUser')) {
    router.navigate(['/courses']);
    return false;
  }
  return true;
};

const routes: Routes = [
  {path: '', component: Home},
  {path: 'courses', component: CourseList},
  {path: 'course/:id', component: CourseDetails},
  {path: 'add-course', component: AddCourse},
  {path: 'login', component: Login, canActivate: [canActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
