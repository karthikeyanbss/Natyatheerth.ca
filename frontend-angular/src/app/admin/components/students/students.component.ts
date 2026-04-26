import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Student } from '../../../models';

@Component({
  selector: 'app-admin-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().subscribe({
      next: (data) => { this.students = data; this.loading = false; },
      error: () => { this.error = 'Failed to load students'; this.loading = false; }
    });
  }

  deleteStudent(id: string): void {
    if (!confirm('Delete this student?')) return;
    this.api.deleteStudent(id).subscribe({
      next: () => { this.students = this.students.filter(s => s.id !== id); }
    });
  }
}
