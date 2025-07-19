import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CourseService} from '../../service/course';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  newUser = {username: '', password: '', role: 'user'};
  error: { message: string } | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router, private courseService: CourseService) {
  }

  onSubmit() {
    this.courseService.createUser(this.newUser).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
        this.error = null;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = {message: 'Une erreur s\'est produite. Veuillez réessayer.'};
        this.successMessage = null;
      }
    });
  }

}
