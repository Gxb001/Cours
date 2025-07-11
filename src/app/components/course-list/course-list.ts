import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../service/course';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.html',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }
}
