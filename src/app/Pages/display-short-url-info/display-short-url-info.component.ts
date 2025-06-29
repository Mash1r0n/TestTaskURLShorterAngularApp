import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortUrlInfoService } from '../../Services/short-url-info/short-url-info.service';
import { ShortUrlInfoModel } from '../../Models/ShortUrlInfoModel';
import { RouterModule } from '@angular/router';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

@Component({
  selector: 'app-display-short-url-info',
  imports: [
    CommonModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './display-short-url-info.component.html',
  styleUrl: './display-short-url-info.component.css'
})

export class DisplayShortUrlInfoComponent implements OnInit {
  urlId: string = '';
  info: ShortUrlInfoModel | null = null;
  
  public AppRouterDefinitions = AppRouterDefinitions;

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly shortUrlInfoService: ShortUrlInfoService) {}

  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id') || '';
    
    this.shortUrlInfoService.retrieveShortUrlInfo(this.urlId).subscribe({
      next: (data: ShortUrlInfoModel) => {
        this.info = data;
      },
      error: (error) => {
        console.error('Error fetching short URL id:', error);
      }
    });
  }
}
