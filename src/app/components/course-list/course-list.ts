import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../service/course';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface Course {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.courses = data;
        } else {
          console.error('Données reçues non valides:', data);
          this.courses = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des cours:', err);
        this.courses = [];
      }
    });
  }
}
