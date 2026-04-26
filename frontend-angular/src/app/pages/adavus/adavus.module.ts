import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdavusComponent } from './adavus.component';

const routes: Routes = [{ path: '', component: AdavusComponent }];

@NgModule({
  declarations: [AdavusComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdavusModule {}
