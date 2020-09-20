import {Injectable} from '@angular/core';
import {Settings} from '../../../models/settings';
import {ElectronService} from './electron/electron.service';
import ElectronStore from 'electron-store';
import {HttpParams} from "@angular/common/http";

import {isEmpty} from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  store: ElectronStore;
  settings: Settings;

  constructor(private electronService: ElectronService) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.store = new electronService.electronStore<Settings>();
    console.log('Initial store:');
    console.log(this.store.store);
    if (isEmpty(this.store.store)) {
      const emptySettings = {
        dota_api_key: '',
        steam_id: -1,
      };
      this.store.store = emptySettings;
      this.settings = emptySettings;
    } else {
      this.settings = this.store.store as unknown;
    }
    console.log(this.store.store);
  }

  getDotaApiParams(): HttpParams {
    return new HttpParams().set('key', this.settings.dota_api_key);
  }

  syncStore<T>(key: string, value: T) {
    this.store.set(key, value);
    this.settings[key] = value;
    console.log(`Updated store: ${key} - ${value.toString()}`)
    console.log(`New settings:`);
    console.log(this.settings);
  }

  setDotaApiKey(dota_api_key: string) {
    this.syncStore('dota_api_key', dota_api_key);
  }

  setSteamId(steam_id: number) {
    this.syncStore('steam_id', steam_id);
  }
}
