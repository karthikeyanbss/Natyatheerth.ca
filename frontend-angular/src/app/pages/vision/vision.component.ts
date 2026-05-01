import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-vision',
  standalone: false,
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent implements OnInit, OnDestroy {
  galleryImages: string[] = [
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

  currentSlide = 0;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => this.nextSlide(), 3500);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  prevSlide(): void {
    this.stopAutoplay();
    this.currentSlide = (this.currentSlide - 1 + this.galleryImages.length) % this.galleryImages.length;
    this.startAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.galleryImages.length;
  }
}
