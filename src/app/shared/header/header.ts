import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./header.css']
})
export class Header {
  constructor(private router: Router) {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
