import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';

interface Course {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.getCourses().pipe(
      switchMap(courses => {
        const maxId = courses.length ? Math.max(...courses.map(c => Number(c.id))) : 0;
        const courseWithId = {...course, id: String(maxId + 1)};
        return this.http.post<Course>(`${this.apiUrl}/courses`, courseWithId);
      })
    );
  }

  updateCourse(id: number, course: any): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
