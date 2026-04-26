import { Component } from '@angular/core';

interface FeeItem {
  type: string;
  level: string;
  frequency: string;
  fee: string;
  notes: string;
}

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent {
  fees: FeeItem[] = [
    { type: 'Group Class', level: 'Beginner / Elementary', frequency: 'Monthly', fee: '$80 / month', notes: '1.5 hrs/week, 4 sessions/month' },
    { type: 'Group Class', level: 'Intermediate / Advanced', frequency: 'Monthly', fee: '$100 / month', notes: '2 hrs/week, 4 sessions/month' },
    { type: 'Group Class', level: 'Children (5–8 yrs)', frequency: 'Monthly', fee: '$60 / month', notes: '1 hr/week, 4 sessions/month' },
    { type: 'Private Class', level: 'All Levels', frequency: 'Per Session', fee: '$50 / session', notes: '1-hour private lesson, flexible schedule' },
    { type: 'Online Class', level: 'All Levels', frequency: 'Monthly', fee: '$70 / month', notes: '1 hr/week via video call, 4 sessions/month' },
    { type: 'Arangetram Prep', level: 'Advanced', frequency: 'Monthly', fee: 'Custom', notes: 'Intensive coaching — contact for details' }
  ];
}
