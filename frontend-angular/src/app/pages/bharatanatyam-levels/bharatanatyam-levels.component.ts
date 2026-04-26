import { Component } from '@angular/core';

interface Level {
  name: string;
  tamil: string;
  duration: string;
  ageGroup: string;
  description: string;
  topics: string[];
  color: string;
}

@Component({
  selector: 'app-bharatanatyam-levels',
  standalone: false,
  templateUrl: './bharatanatyam-levels.component.html',
  styleUrls: ['./bharatanatyam-levels.component.scss']
})
export class BharatanatyamLevelsComponent {
  levels: Level[] = [
    {
      name: 'Beginner',
      tamil: 'ஆரம்பம்',
      duration: '1–2 years',
      ageGroup: '5+ years',
      description: 'Foundation training in the basic postures, movements, and rhythmic concepts of Bharatanatyam.',
      topics: ['Aramandi (half-sit posture)', 'Basic footwork patterns', 'Hand gestures (Mudras)', 'Body posture and alignment', 'Rhythmic syllables (Sollukattu)', 'Introductory Adavus (Tattadavu, Nattadavu)'],
      color: '#c6f6d5'
    },
    {
      name: 'Elementary',
      tamil: 'அடிப்படை',
      duration: '2–3 years',
      ageGroup: '7+ years',
      description: 'Expanding vocabulary of movement, introduction to expressive storytelling and rhythmic complexity.',
      topics: ['Advanced Adavu series', 'Alarippu', 'Jatiswaram', 'Introduction to Abhinaya', 'Tala (rhythmic cycles)', 'Stage presence and formation'],
      color: '#bee3f8'
    },
    {
      name: 'Intermediate',
      tamil: 'நடுத்தர நிலை',
      duration: '3–4 years',
      ageGroup: '10+ years',
      description: 'Deep dive into expressive repertoire and the classical margam structure.',
      topics: ['Shabdam', 'Varnam (sections)', 'Keerthanam/Padam basics', 'Complex Nritta', 'Abhinaya development', 'Layam and rhythmic improvisation'],
      color: '#feebc8'
    },
    {
      name: 'Advanced',
      tamil: 'உயர் நிலை',
      duration: '4+ years',
      ageGroup: '12+ years',
      description: 'Mastery of the complete classical repertoire, deepening artistic interpretation.',
      topics: ['Full Varnam', 'Padam and Javali', 'Tillana', 'Shlokam and Mangalam', 'Advanced Abhinaya', 'Choreography principles'],
      color: '#e9d8fd'
    },
    {
      name: 'Margam (Arangetram)',
      tamil: 'மார்கம்',
      duration: 'Preparation: 1 year',
      ageGroup: 'Advanced students',
      description: 'The complete classical concert format. Students prepare for their solo debut performance (Arangetram).',
      topics: ['Pushpanjali', 'Alarippu', 'Jatiswaram', 'Shabdam', 'Varnam', 'Padam', 'Tillana', 'Shlokam & Mangalam', 'Stage production', 'Costume & makeup'],
      color: '#fed7d7'
    }
  ];
}
