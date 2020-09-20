import { Injectable} from '@angular/core';
import { MatchDetails, DotaResponse } from '../../../models/dota/';
import { Observable } from 'rxjs';
import {NedbStoreService} from './nedb-store.service';
import {SettingsService} from './settings.service';

@Injectable({ providedIn: 'root' })
export class DotaApiService {
  private baseUrl = 'http://api.steampowered.com';

  constructor(private nedbStoreService: NedbStoreService, private settingsService: SettingsService) {}

  getMatchDetails(matchId: number): Observable<DotaResponse<MatchDetails>> {
    const url = `${this.baseUrl}/IDOTA2Match_570/GetMatchDetails/v1`;
    const params = this.settingsService.getDotaApiParams().set('match_id', String(matchId));
    return this.nedbStoreService.dota<DotaResponse<MatchDetails>>(url, params);
  }
}
