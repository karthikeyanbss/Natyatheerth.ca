import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutGuruComponent } from './about-guru.component';

const routes: Routes = [{ path: '', component: AboutGuruComponent }];

@NgModule({
  declarations: [AboutGuruComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AboutGuruModule {}
