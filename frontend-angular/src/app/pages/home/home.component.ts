import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly stageImages: string[] = [
    'assets/Gallery/gallery image 1.JPG',
    'assets/Gallery/gallery image 2.JPG',
    'assets/Gallery/gallery image 3.JPG',
    'assets/Gallery/gallery image 4.JPG',
    'assets/Gallery/gallery image 5.jpg',
    'assets/Gallery/gallery image 6.jpg',
    'assets/Gallery/gallery image 7.jpg',
    'assets/Gallery/gallery image 8.JPG',
    'assets/Gallery/gallery image 9.JPG',
    'assets/Gallery/gallery image 10JPG.JPG'
  ];

  readonly foundationTracks: Array<{ title: string; description: string; link: string; cta: string }> = [
    {
      title: 'Beginner Foundation',
      description: 'Strong basics in posture, rhythm, adavus, and stage confidence for children and adults.',
      link: '/bharatanatyam-levels',
      cta: 'View Levels'
    },
    {
      title: 'Performance Training',
      description: 'Structured margam progression with abhinaya coaching and rehearsal-focused classes.',
      link: '/margam',
      cta: 'Explore Margam'
    },
    {
      title: 'Flexible Learning',
      description: 'Group, one-on-one, and online options designed for families with busy schedules.',
      link: '/register',
      cta: 'Enroll Now'
    }
  ];

  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }
}
