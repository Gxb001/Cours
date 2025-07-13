import {NgModule} from '@angular/core';
import {CanActivateFn, Router, RouterModule, Routes} from '@angular/router';
import {Home} from './components/home/home';
import {CourseList} from './components/course-list/course-list';
import {CourseDetails} from './components/course-details/course-details';
import {AddCourse} from './components/add-course/add-course';
import {Login} from './components/login/login';
import {authGuard} from './auth-guard';

const canActivateAdmin: CanActivateFn = (route, state) => {
  const router = new Router();
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }
  const user = JSON.parse(currentUser);
  return user.role === 'admin';
};

const routes: Routes = [
  {path: '', component: Home},
  {path: 'courses', component: CourseList},
  {path: 'course/:id', component: CourseDetails, canActivate: [canActivateAdmin]},
  {path: 'add-course', component: AddCourse, canActivate: [authGuard]},
  {
    path: 'login', component: Login, canActivate: [() => {
      const router = new Router();
      if (localStorage.getItem('currentUser')) {
        router.navigate(['/courses']);
        return false;
      }
      return true;
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
