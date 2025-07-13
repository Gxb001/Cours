import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CourseService} from '../../service/course';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.html',
  imports: [
    RouterLink,
    FormsModule
  ],
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {
  course: any;
  isAdmin: boolean = false;
  editMode: boolean = false;
  editedCourse = {name: '', description: ''};

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourse(id).subscribe(data => {
      this.course = data;
      this.editedCourse = {...data};
    });
    const currentUser = localStorage.getItem('currentUser');
    this.isAdmin = currentUser ? JSON.parse(currentUser).role === 'admin' : false;
  }

  toggleEdit() {
    if (this.isAdmin) this.editMode = !this.editMode;
  }

  saveChanges() {
    if (this.isAdmin) {
      this.courseService.addCourse(this.editedCourse).subscribe(() => {
        this.course = {...this.editedCourse};
        this.editMode = false;
      });
    }
  }

  deleteCourse() {
    if (this.isAdmin) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
        this.courseService.addCourse(this.course.id).subscribe(() => {
          this.router.navigate(['/courses']);
        }, error => console.error('Erreur lors de la suppression:', error));
      }
    }
  }
}
