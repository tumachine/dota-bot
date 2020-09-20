import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SteamApiService} from "../core/services/steam-api.service";
import {SettingsService} from "../core/services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private steamApiService: SteamApiService,
    private settingsService: SettingsService,
    private fb: FormBuilder,
  ) { }

  formGroup = this.fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    steamId: ['', Validators.required],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dotaApiKey: ['', Validators.required]
  })

  steamId = this.formGroup.get('steamId');
  dotaApiKey = this.formGroup.get('dotaApiKey');

  ngOnInit(): void {
    const dotaApiKeyExists = this.settingsService.settings.dota_api_key !== '';
    const steamIdExists = this.settingsService.settings.steam_id !== -1;

    if (!dotaApiKeyExists || !steamIdExists) {
      this.router.navigate(['/initial-setup']);
    }
  }

  checkSteamId(): void {
    this.settingsService.setDotaApiKey(this.dotaApiKey.value);
    this.steamApiService.getPlayerSummaries(this.steamId.value).subscribe(value => console.log(value));
  }
}
