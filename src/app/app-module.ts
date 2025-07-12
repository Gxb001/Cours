import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {Header} from './shared/header/header';
import {Footer} from './shared/footer/footer';
import {Home} from './components/home/home';
import {CourseList} from './components/course-list/course-list';
import {CourseDetails} from './components/course-details/course-details';
import {AddCourse} from './components/add-course/add-course';
import {HttpClientModule} from '@angular/common/http';
import {Login} from './components/login/login';
import {FormsModule} from "@angular/forms"; // Ajouté ici

@NgModule({
  declarations: [
    App,
    Footer,
    Home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CourseList,
    CourseDetails,
    AddCourse,
    HttpClientModule,
    FormsModule,
    Login,
    Header
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule {
}
