import { HttpParams } from '@angular/common/http';

export function removeKeys(params: HttpParams, ...keys: string[]) {
  const objectParams: { [key: string]: any } = {};
  params.keys().forEach(key => {
    if (!keys.includes(key)) {
      objectParams[key] = params.get(key)
    }
  });
  return objectParams;
}
