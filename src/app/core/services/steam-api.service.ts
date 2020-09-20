import {Injectable} from '@angular/core';
import {NedbStoreService} from './nedb-store.service';
import {SettingsService} from './settings.service';
import {PlayerSummaries, ResolveVanityUrl, SteamResponse} from '../../../models/steam/'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamApiService {
  constructor(private nedbStoreService: NedbStoreService, private settingsService: SettingsService) { }

  getPlayerSummaries(...steam_ids: string[]): Observable<SteamResponse<PlayerSummaries>> {
    const url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';
    const params = this.settingsService.getDotaApiParams().set('steamids', steam_ids.join(','))
    return this.nedbStoreService.steam<SteamResponse<PlayerSummaries>>(url, params);
  }

  resolveVanityUrl(vanityurl: string) {
    const url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/';
    const params = this.settingsService.getDotaApiParams().set('vanityurl', vanityurl)
    return this.nedbStoreService.steam<SteamResponse<ResolveVanityUrl>>(url, params);
  }
}
