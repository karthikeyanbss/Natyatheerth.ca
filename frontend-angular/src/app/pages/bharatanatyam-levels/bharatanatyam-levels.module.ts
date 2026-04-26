import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BharatanatyamLevelsComponent } from './bharatanatyam-levels.component';

const routes: Routes = [{ path: '', component: BharatanatyamLevelsComponent }];

@NgModule({
  declarations: [BharatanatyamLevelsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BharatanatyamLevelsModule {}
