import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortUrlModel } from '../../Models/ShortUrlModel'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class ShourtUrlService {
  private readonly retrieveAllShortUrlsAPI: string = 'https://localhost:7290/ShortUrl';

  constructor(private readonly http: HttpClient) { }

  getAllShortUrls(): Observable<ShortUrlModel[]> {
    return this.http.get<ShortUrlModel[]>(this.retrieveAllShortUrlsAPI);
  }
}
