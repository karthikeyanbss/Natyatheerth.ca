import { Component } from '@angular/core';

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss']
})
export class VisionComponent {
  values: Value[] = [
    { icon: '🙏', title: 'Devotion (Bhakti)', description: 'Bharatanatyam is a form of worship. We approach each class and performance with reverence for the art and its lineage.' },
    { icon: '📚', title: 'Rigorous Learning', description: 'We follow the classical curriculum — from foundational adavus to full margam — ensuring students build a deep and lasting technical foundation.' },
    { icon: '💃', title: 'Expressive Freedom', description: 'Within the structure of tradition, we celebrate each student\'s unique expressive voice, developing their abhinaya and artistic individuality.' },
    { icon: '🤝', title: 'Inclusive Community', description: 'Our studio welcomes students of all backgrounds, ages, and abilities. We believe dance belongs to everyone who seeks it with sincerity.' },
    { icon: '🏆', title: 'Excellence', description: 'We set high standards for ourselves and our students — not to compete, but to honour the art form and the gurus who preserved it for us.' }
  ];
}
