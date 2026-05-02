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
    'assets/Gallery/New Image_may 2.jpg'
  ];

  selectedGalleryImage: string | null = null;

  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }

  openGalleryImage(image: string): void {
    this.selectedGalleryImage = image;
  }

  closeGalleryImage(): void {
    this.selectedGalleryImage = null;
  }
}
