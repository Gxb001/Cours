import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CourseService} from '../../service/course';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {
  course: any;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourse(id).subscribe(data => this.course = data);
  }
}
