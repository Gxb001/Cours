import {Component} from '@angular/core';
import {CourseService} from '../../service/course';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.css']
})
export class Login {
  credentials = {username: '', password: ''};
  error: { message: string, type: 'username' | 'password' | 'general' } | null = null;

  constructor(private courseService: CourseService, private router: Router) {
  }

  onSubmit() {
    this.error = null; // Réinitialiser l'erreur avant chaque tentative
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
      // Gestion d'une erreur réseau ou autre
      this.error = {message: 'Erreur lors de la connexion. Veuillez réessayer.', type: 'general'};
    });
  }
}
