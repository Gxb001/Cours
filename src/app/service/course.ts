import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000'; // Base URL

  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  getCourse(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses`, course);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
}
