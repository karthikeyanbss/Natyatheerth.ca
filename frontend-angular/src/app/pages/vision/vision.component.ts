import { Component } from '@angular/core';

@Component({
  selector: 'app-vision',
  standalone: false,
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent {
  visionImages: string[] = [
    'assets/Gallery/gallery image 8.JPG',
    'assets/Gallery/gallery image 9.JPG',
    'assets/Gallery/gallery image 10JPG.JPG'
  ];

  selectedImage: string | null = null;

  openImage(src: string): void {
    this.selectedImage = src;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
