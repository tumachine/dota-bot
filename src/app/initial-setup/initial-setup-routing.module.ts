import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialSetupComponent } from './initial-setup.component';
import { SetDotaApiComponent } from './set-dota-api/set-dota-api.component';

const routes: Routes = [
  {
    path: 'set-dota-api',
    component: SetDotaApiComponent
  }
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialSetupRoutingModule {}
