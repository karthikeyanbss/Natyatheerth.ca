import { Component } from '@angular/core';

interface MargamItem {
  name: string;
  tamil: string;
  type: string;
  duration: string;
  description: string;
  order: number;
}

@Component({
  selector: 'app-margam',
  templateUrl: './margam.component.html',
  styleUrls: ['./margam.component.scss']
})
export class MargamComponent {
  items: MargamItem[] = [
    { order: 1, name: 'Pushpanjali', tamil: 'புஷ்பாஞ்சலி', type: 'Opening Prayer', duration: '5–8 min', description: 'An offering of flowers to the deity, the guru, and the audience. Sets the sacred tone of the recital.' },
    { order: 2, name: 'Alarippu', tamil: 'அலரிப்பு', type: 'Pure Dance (Nritta)', duration: '5–8 min', description: 'Meaning "blossoming," Alarippu is a pure rhythmic piece that gradually awakens the body — eyes, neck, hands, and feet — like a flower opening.' },
    { order: 3, name: 'Jatiswaram', tamil: 'ஜதிஸ்வரம்', type: 'Pure Dance (Nritta)', duration: '8–12 min', description: 'A rhythmically complex piece set to musical notes (swaras) without lyrics. Displays the dancer\'s mastery of tala and complex footwork.' },
    { order: 4, name: 'Shabdam', tamil: 'சப்தம்', type: 'Expressive (Nritya)', duration: '8–12 min', description: 'The first piece with lyrics and abhinaya (expressive mime). Usually devotional, it introduces the dancer\'s expressive storytelling capability.' },
    { order: 5, name: 'Varnam', tamil: 'வர்ணம்', type: 'Combined (Nritta + Nritya)', duration: '25–45 min', description: 'The centrepiece of the margam. A Varnam combines pure dance, abhinaya, and complex rhythmic passages. It showcases the dancer\'s full range of technical and expressive skills.' },
    { order: 6, name: 'Padam', tamil: 'பதம்', type: 'Expressive (Nritya)', duration: '8–12 min', description: 'A slow, devotional lyrical piece emphasising subtle abhinaya. Usually dedicated to a deity, exploring themes of love and devotion (shringara and bhakti).' },
    { order: 7, name: 'Javali', tamil: 'ஜாவலி', type: 'Expressive (Nritya)', duration: '5–8 min', description: 'A lighter, more playful love song that provides contrast to the intensity of the Varnam and Padam.' },
    { order: 8, name: 'Tillana', tamil: 'திள்ளான', type: 'Pure Dance (Nritta)', duration: '8–12 min', description: 'A brilliant, rhythmically vibrant concluding piece. Filled with energy, complex footwork, and graceful lines — a crowd favourite.' },
    { order: 9, name: 'Shlokam & Mangalam', tamil: 'ஶ்லோகம் & மங்களம்', type: 'Closing', duration: '3–5 min', description: 'A Sanskrit verse followed by an auspicious closing benediction, expressing gratitude to God, guru, and audience.' }
  ];
}
