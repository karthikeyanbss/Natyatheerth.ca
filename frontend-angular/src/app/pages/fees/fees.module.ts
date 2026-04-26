import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeesComponent } from './fees.component';

const routes: Routes = [{ path: '', component: FeesComponent }];

@NgModule({
  declarations: [FeesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class FeesModule {}
