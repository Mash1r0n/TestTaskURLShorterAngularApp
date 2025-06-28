import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRouterDefinitions } from '../../RouterDefinitions/api.router.definitions';
import { ShortUrlInfoModel } from '../../Models/ShortUrlInfoModel';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlInfoService {
  constructor(private readonly http: HttpClient) { }

  retrieveShortUrlInfo(urlId: string): Observable<ShortUrlInfoModel> {
      return this.http.get<ShortUrlInfoModel>(ApiRouterDefinitions.RetrieveShortUrlInfoAPI + urlId);
  }
}
