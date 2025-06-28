import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShortUrl {
  id: string;
  code: string;
  longUrl: string;
  createdAt: string;
  ownerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShourtUrlService {
  private readonly retrieveAllShortUrlsAPI: string = 'https://localhost:7290/ShortUrl';

  constructor(private readonly http: HttpClient) { }

  getAllShortUrls(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(this.retrieveAllShortUrlsAPI);
  }
}
