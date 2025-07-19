import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';


interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.getUsers().pipe(
      switchMap(users => {
        const newUser = {...user, id: String(users.length + 1)};
        return this.http.post<User>(`${this.apiUrl}/users`, newUser);
      })
    );
  }

}
