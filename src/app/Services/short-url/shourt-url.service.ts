import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortUrlModel } from '../../Models/ShortUrlModel'; // Adjust the import path as necessary
import { CreateShortUrlModel } from '../../Models/CreateShortUrlModel';

@Injectable({
  providedIn: 'root'
})
export class ShourtUrlService {
  private readonly retrieveAllShortUrlsAPI: string = 'https://localhost:7290/ShortUrl';
  private readonly AddNewShortUrlsAPI: string = 'https://localhost:7290/ShortUrl';
  private readonly DeleteShortUrlsAPI: string = 'https://localhost:7290/ShortUrl/code/';

  constructor(private readonly http: HttpClient) { }

  getAllShortUrls(): Observable<ShortUrlModel[]> {
    return this.http.get<ShortUrlModel[]>(this.retrieveAllShortUrlsAPI);
  }

  addNewShortUrl(createShortUrlModel: CreateShortUrlModel): Observable<ShortUrlModel> {
    return this.http.post<ShortUrlModel>(this.AddNewShortUrlsAPI, createShortUrlModel);
  }

  deleteShortUrlByCode(urlCode: string): Observable<void> {
    return this.http.delete<void>(this.DeleteShortUrlsAPI + urlCode);
  }
}
