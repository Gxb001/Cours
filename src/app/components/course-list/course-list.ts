import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../service/course';
import {RouterLink} from '@angular/router';

interface Course {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.html',
  imports: [
    RouterLink
  ],
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }
}
