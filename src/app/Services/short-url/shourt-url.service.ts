import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortUrlModel } from '../../Models/ShortUrlModel'; // Adjust the import path as necessary
import { CreateShortUrlModel } from '../../Models/CreateShortUrlModel';
import { ApiRouterDefinitions } from '../../RouterDefinitions/api.router.definitions';

@Injectable({
  providedIn: 'root'
})
export class ShourtUrlService {
  constructor(private readonly http: HttpClient) { }

  getAllShortUrls(): Observable<ShortUrlModel[]> {
    return this.http.get<ShortUrlModel[]>(ApiRouterDefinitions.RetrieveAllShortUrlsAPI);
  }

  addNewShortUrl(createShortUrlModel: CreateShortUrlModel): Observable<ShortUrlModel> {
    return this.http.post<ShortUrlModel>(ApiRouterDefinitions.AddNewShortUrlAPI, createShortUrlModel);
  }

  deleteShortUrlByCode(urlCode: string): Observable<void> {
    return this.http.delete<void>(ApiRouterDefinitions.DeleteShortUrlAPI + urlCode);
  }
}
