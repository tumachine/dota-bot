import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {from, Observable } from 'rxjs';
import {RequestStore} from '../../../models/request-store';
import {ElectronService} from './electron/electron.service';
import Datastore from 'nedb-promises';
import {removeKeys} from '../../../utils/utils';
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
// it is basically a wrapper over http
export class NedbStoreService {
  db: { [name: string]: Datastore };

  constructor(private http: HttpClient, private electronService: ElectronService) {
    const dbFactory = (fileName: string): Datastore => {
      return electronService.nedb.create({
        filename: `${this.electronService.app.getAppPath()}/data/${fileName}`,
        timestampData: true,
        autoload: true
      });
    }

    this.db = {
      // add functionality for receiving array of values
      dota: dbFactory('dota.db'),
      steam: dbFactory('steam.db'),
    }
  }

  private async storeRequest<T>(store: Datastore, url: string, params: HttpParams): Promise<T> {
    const paramsWithoutKey = removeKeys(params, 'key');
    // we could generate id by sorting parameters and then adding to url

    const doc = await store.findOne<RequestStore<T>>({
      url,
      params: paramsWithoutKey,
    })
    console.log(doc);

    if (doc?.data) {
      console.log('returning DATABASE')
      return doc.data;
    } else {
      console.log('returning REQUEST')
      try {
        const httpDoc = await this.http.get<T>(url, { params }).toPromise();
        await store.insert({url, params: paramsWithoutKey, data: httpDoc});
        return httpDoc;
      } catch (error) {
        return error;
      }
    }
  }

  dota<T>(url: string, params: HttpParams): Observable<T> {
    return from(this.storeRequest<T>(this.db.dota, url, params));
  }

  steam<T>(url: string, params: HttpParams): Observable<T> {
    return fromPromise(this.storeRequest<T>(this.db.steam, url, params));
  }
}
