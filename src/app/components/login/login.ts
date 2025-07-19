import {Component} from '@angular/core';
import {CourseService} from '../../service/course';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.css']
})
export class Login {
  credentials = {username: '', password: ''};
  error: { message: string, type: 'username' | 'password' | 'general' } | null = null;

  constructor(private courseService: CourseService, private router: Router) {
  }

  onSubmit() {
    this.error = null;
    this.courseService.getUsers().subscribe(users => {
      const user = users.find(u => u.username === this.credentials.username);
      if (!user) {
        this.error = {message: 'Utilisateur introuvable', type: 'username'};
        return;
      }
      if (user.password !== this.credentials.password) {
        this.error = {message: 'Mot de passe incorrect', type: 'password'};
        return;
      }
      // Succès de la connexion
      localStorage.setItem('currentUser', JSON.stringify({username: user.username, role: user.role}));
      this.router.navigate(['/courses']);
    }, error => {
      this.error = {message: 'Erreur lors de la connexion. Veuillez réessayer.', type: 'general'};
    });
  }
}
