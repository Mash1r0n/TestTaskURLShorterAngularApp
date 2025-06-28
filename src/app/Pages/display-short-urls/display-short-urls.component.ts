import { Component } from '@angular/core';
import { ShourtUrlService } from '../../Services/short-url/shourt-url.service';
import { ShortUrlModel } from '../../Models/ShortUrlModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-short-urls',
  imports: [
    CommonModule
  ],
  standalone: true,
  templateUrl: './display-short-urls.component.html',
  styleUrl: './display-short-urls.component.css'
})
export class DisplayShortUrlsComponent {
  receivedInfo: ShortUrlModel[] = [];

  constructor(private readonly shortUrlService: ShourtUrlService) {
    this.shortUrlService.getAllShortUrls().subscribe({
      next: (data: ShortUrlModel[]) => {
        this.receivedInfo = data;
      },
      error: (error) => {
        console.error('Error fetching short URLs:', error);
      }
    });
  }

  onAddUrl(): void {
    // TODO: подключи открытие формы или навигацию
  }

  onView(url: any): void {
    // TODO: подключи вывод деталей
  }

  onDelete(url: any): void {
    // TODO: подключи удаление
  }
}
