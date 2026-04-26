import { Component } from '@angular/core';

interface AdavuCategory {
  name: string;
  count: string;
  description: string;
  examples: string[];
}

@Component({
  selector: 'app-adavus',
  templateUrl: './adavus.component.html',
  styleUrls: ['./adavus.component.scss']
})
export class AdavusComponent {
  intro = `Adavus (அடவுகள்) are the basic units of movement in Bharatanatyam — the building blocks from 
  which all compositions are created. Each adavu is a combination of foot movements, body positions, and 
  hand gestures performed to specific rhythmic syllables (sollukattu). Mastery of adavus is the foundation 
  of all Bharatanatyam training.`;

  categories: AdavuCategory[] = [
    {
      name: 'Tattadavu',
      count: '8 variations',
      description: 'Pure stamping adavus forming the foundation of Bharatanatyam footwork. Develops rhythmic precision and leg strength.',
      examples: ['Tattadavu 1–8', 'Single and double beats', 'Standing and sitting positions']
    },
    {
      name: 'Nattadavu',
      count: '8 variations',
      description: 'Diagonal leg extensions combined with stamps. Builds flexibility and control of the lower body.',
      examples: ['Nattadavu 1–8', 'Front and side extensions', 'Half-sit variations']
    },
    {
      name: 'Visharu Adavu',
      count: '4 variations',
      description: 'Flowing, throwing movements of the legs combined with graceful arm gestures.',
      examples: ['Visharu 1–4', 'Combined arm and leg coordination']
    },
    {
      name: 'Tattimett Adavu',
      count: '8 variations',
      description: 'Involves heel-toe combinations and complex rhythmic patterns.',
      examples: ['Heel-toe patterns', 'Rhythmic syncopation', 'Level changes']
    },
    {
      name: 'Mandi Adavu',
      count: '8 variations',
      description: 'Half-sit (Mandi) position adavus that build thigh strength and the characteristic Bharatanatyam posture.',
      examples: ['Full Mandi position', 'Mandi with stamps', 'Floor-level movements']
    },
    {
      name: 'Sarika Adavu',
      count: '4 variations',
      description: 'Gliding sideways movements that develop spatial awareness and smooth transitions.',
      examples: ['Side glides', 'Combined steps', 'Level variations']
    },
    {
      name: 'Paraval Adavu',
      count: '4 variations',
      description: 'Bird-like flying movements combining jumps and graceful arm gestures.',
      examples: ['Jump combinations', 'Flying hand gestures', 'Dynamic sequences']
    },
    {
      name: 'Eelattu Adavu',
      count: '4 variations',
      description: 'Swinging and rocking movements that add fluidity and grace.',
      examples: ['Body swings', 'Arm coordination', 'Rhythmic patterns']
    },
    {
      name: 'Mettu Adavu',
      count: '8 variations',
      description: 'Heel-based adavus creating rich percussive sounds on stage.',
      examples: ['Heel patterns', 'Complex rhythms', 'Spatial movement']
    },
    {
      name: 'Jati Adavu',
      count: '4 variations',
      description: 'Compound adavus combining multiple previously learned patterns into complex sequences.',
      examples: ['Combined patterns', 'Extended sequences', 'Performance preparation']
    }
  ];
}
