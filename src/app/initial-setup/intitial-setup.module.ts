import { NgModule } from "@angular/core";
import { InitialSetupRoutingModule } from "./initial-setup-routing.module";
import { InitialSetupComponent } from "./initial-setup.component";
import { SetDotaApiComponent } from "./set-dota-api/set-dota-api.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InitialSetupComponent, SetDotaApiComponent],
  imports: [CommonModule, SharedModule, InitialSetupRoutingModule],
})
export class InitialSetupModule {}
