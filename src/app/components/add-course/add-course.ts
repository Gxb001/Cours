import {Component} from '@angular/core';
import {CourseService} from '../../service/course';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrl: './add-course.css'
})
export class AddCourse {
  newCourse = {name: '', description: ''};
  accessDenied: boolean = false;

  constructor(private courseService: CourseService, private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    this.accessDenied = currentUser ? JSON.parse(currentUser).role !== 'admin' : true;
  }

  onSubmit() {
    if (!this.accessDenied) {
      this.courseService.addCourse(this.newCourse).subscribe({
        next: (response) => {
          const newId = parseInt(String(response.id), 10);
          if (isNaN(newId)) {
            console.error('ID retourné invalide:', response.id);
            this.router.navigate(['/courses']);
          } else {
            this.router.navigate([`/course/${newId}`]);
          }
        },
        error: err => {
          console.error('Erreur lors de l\'ajout:', err);
          this.accessDenied = true;
        }
      });
    }
  }
}
