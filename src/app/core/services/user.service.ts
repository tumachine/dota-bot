import {Injectable} from '@angular/core';
import {NedbStoreService} from './nedb-store.service';
import {Observable, throwError} from 'rxjs';
import {UserData} from '../../../models/user';
import {switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserData;

  userStore = this.nedbStoreService.db.user;

  constructor(private nedbStoreService: NedbStoreService) {
    // this.createUser().pipe(
    //   switchMap(() => this.addDotaApiKey())
    // ).subscribe();
  }

  getUser(steam_id: number): Observable<UserData> {
    return fromPromise(this.getUserAsync(steam_id));
  }

  private async getUserAsync(steam_id: number): Promise<UserData> {
    this.user = await this.userStore.findOne<UserData>({ steam_id: steam_id });
    return this.user;
  }

  createUser(steam_id: number): Observable<UserData> {
    return fromPromise(this.createUserAsync(steam_id));
  }

  private async createUserAsync(steam_id: number): Promise<UserData> {
    let user = await this.getUserAsync(steam_id);
    if (user != null) {
      throw 'User with this id already exists';
    }

    user = await this.userStore.insert<UserData>( {steam_id, dota_api_key: null });
    if (user) {
      this.user = user;
      return user;
    }

    throw 'Could not create user';
  }


  addDotaApiKey(dota_api_key: string): Observable<UserData> {
    return fromPromise(this.addDotaApiKeyAsync(dota_api_key));
  }

  private async addDotaApiKeyAsync(dota_api_key: string): Promise<UserData> {
    const user = await this.userStore.findOne<UserData>({ steam_id: this.user.steam_id })
    if (user != null) {
      await this.userStore.update<UserData>({ steam_id: this.user.steam_id }, { $set: { dota_api_key }})
      this.user.dota_api_key = dota_api_key;
      return this.user;
    }
    throw 'User does not exist to add dota_api_key';
  }
}
