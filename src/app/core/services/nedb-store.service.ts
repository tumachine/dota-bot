import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {from, Observable } from 'rxjs';
import {RequestStore} from '../../../models/dota-store';
import {ElectronService} from './electron/electron.service';
import Datastore from 'nedb-promises';
import {removeKeys} from '../../../utils/utils';

@Injectable({
  providedIn: 'root'
})
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
      dota: dbFactory('dota.db'),
      user: dbFactory('user.db'),
    }
  }

  private async storeRequest<T>(store: Datastore, url: string, params: HttpParams): Promise<T> {
    const paramsWithoutKey = removeKeys(params, 'key');
    // we could generate id by sorting parameters and then adding to url

    const doc = await store.findOne<RequestStore<T>>({
      url,
      params: paramsWithoutKey,
    })

    if (doc?.data) {
      console.log('returning DATABASE')
      return doc.data;
    } else {
      console.log('returning REQUEST')
      const httpDoc = await this.http.get<T>(url, { params }).toPromise();
      await store.insert({url, params: paramsWithoutKey, data: httpDoc});
      return httpDoc;
    }
  }

  dota<T>(url: string, params: HttpParams): Observable<T> {
    return from(this.storeRequest<T>(this.db.dota, url, params));
  }
}
