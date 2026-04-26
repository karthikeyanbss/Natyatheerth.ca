import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ClassItem } from '../../../models';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes: ClassItem[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getClasses().subscribe({
      next: (data) => { this.classes = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
