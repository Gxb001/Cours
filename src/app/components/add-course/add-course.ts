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

  constructor(private courseService: CourseService, private router: Router) {
  }

  onSubmit() {
    this.courseService.addCourse(this.newCourse).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }
}
