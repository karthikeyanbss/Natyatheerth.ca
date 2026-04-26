import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ClassItem } from '../../models';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  classes: ClassItem[] = [];
  loading = true;
  error = '';

  // Fallback static schedule if API not available
  staticSchedule: ClassItem[] = [
    { name: 'Beginner Group', description: 'Foundation adavus and postures for new students', level: 'Beginner', mode: 'in_person', dayOfWeek: 'Saturday', startTime: '10:00 AM', endTime: '11:30 AM', capacity: 12 },
    { name: 'Elementary Group', description: 'Alarippu, Jatiswaram and Abhinaya introduction', level: 'Elementary', mode: 'in_person', dayOfWeek: 'Saturday', startTime: '12:00 PM', endTime: '1:30 PM', capacity: 10 },
    { name: 'Intermediate / Advanced', description: 'Varnam, Padam and full margam preparation', level: 'Intermediate/Advanced', mode: 'in_person', dayOfWeek: 'Sunday', startTime: '10:00 AM', endTime: '12:00 PM', capacity: 8 },
    { name: 'Children\'s Class (5–8 yrs)', description: 'Fun, structured introduction to classical dance for young children', level: 'Beginner', mode: 'in_person', dayOfWeek: 'Sunday', startTime: '2:00 PM', endTime: '3:00 PM', capacity: 10 },
    { name: 'Women\'s Group Class', description: 'Dedicated group class for women of all levels', level: 'All Levels', mode: 'in_person', dayOfWeek: 'Wednesday', startTime: '7:00 PM', endTime: '8:30 PM', capacity: 12 },
    { name: 'Private / Online Sessions', description: 'One-on-one classes in-person or via video call — flexible scheduling', level: 'All Levels', mode: 'both', dayOfWeek: 'Flexible', startTime: 'By Appointment', endTime: '', capacity: 1 }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.loading = false;
      },
      error: () => {
        this.classes = this.staticSchedule;
        this.loading = false;
      }
    });
  }

  getModeLabel(mode: string): string {
    const map: Record<string, string> = { in_person: 'In-Person', online: 'Online', both: 'In-Person / Online' };
    return map[mode] ?? mode;
  }
}
