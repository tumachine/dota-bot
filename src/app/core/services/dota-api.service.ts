import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatchDetails } from '../../../models/match-details';
import { Observable } from 'rxjs';
import {NedbStoreService} from './nedb-store.service';
import {UserService} from './user.service';

@Injectable({ providedIn: 'root' })
export class DotaApiService {
  private baseUrl = 'http://api.steampowered.com';

  constructor(private http: HttpClient, private storeApiRequest: NedbStoreService, private userService: UserService) {}

  private paramsWithKey() {
    return new HttpParams().set('key', this.userService.user.dota_api_key)
  }

  getMatchDetails(matchId: number): Observable<MatchDetails> {
    const url = `${this.baseUrl}/IDOTA2Match_570/GetMatchDetails/v1`;
    const params = this.paramsWithKey().set('match_id', String(matchId));
    return this.storeApiRequest.dota(url, params);
  }
}
