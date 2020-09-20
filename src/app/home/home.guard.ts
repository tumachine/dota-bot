import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../core/services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private settingsService: SettingsService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const dotaApiKeyExists = this.settingsService.settings.dota_api_key !== '';
    const steamIdExists = this.settingsService.settings.steam_id !== -1;
    return dotaApiKeyExists && steamIdExists;
  }
}
