import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CourseService} from '../../service/course';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.html',
  imports: [
    RouterLink,
    FormsModule,
    DatePipe
  ],
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {
  course: any;
  isAdmin: boolean = false;
  editMode: boolean = false;
  editedCourse = {id: 0, name: '', description: ''};
  accessDenied: "" | null | boolean = false;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? parseInt(idParam, 10) : 0; // Convertir en nombre
    if (isNaN(id) || !idParam) {
      console.error('ID invalide:', idParam);
      this.router.navigate(['/courses']);
      return;
    }
    this.courseService.getCourse(id).subscribe({
      next: data => {
        this.course = data;
        this.editedCourse = {...data, id: parseInt(String(data.id), 10)};
      },
      error: err => {
        console.error('Erreur lors de la récupération du cours:', err);
        this.router.navigate(['/courses']);
      }
    });
    const currentUser = localStorage.getItem('currentUser');
    this.isAdmin = currentUser ? JSON.parse(currentUser).role === 'admin' : false;
    this.accessDenied = currentUser && !this.isAdmin;
  }

  toggleEdit() {
    if (this.isAdmin) this.editMode = !this.editMode;
    else this.accessDenied = true;
  }

  saveChanges() {
    if (this.isAdmin && this.course && !isNaN(this.course.id)) {
      this.courseService.updateCourse(this.course.id, this.editedCourse).subscribe({
        next: () => {
          this.course = {...this.editedCourse};
          this.editMode = false;
        },
        error: err => {
          console.error('Erreur lors de la mise à jour:', err);
          this.accessDenied = true;
        }
      });
    } else {
      this.accessDenied = true;
    }
  }

  deleteCourse() {
    if (this.isAdmin && this.course && !isNaN(this.course.id)) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
        this.courseService.deleteCourse(this.course.id).subscribe({
          next: () => this.router.navigate(['/courses']),
          error: err => console.error('Erreur lors de la suppression:', err)
        });
      }
    } else {
      this.accessDenied = true;
    }
  }
}
