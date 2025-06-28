import { Component } from '@angular/core';
import { ShourtUrlService } from '../../Services/short-url/shourt-url.service';
import { ShortUrlModel } from '../../Models/ShortUrlModel';
import { CommonModule } from '@angular/common';
import { AddShortUrlModalComponent } from '../../Components/add-short-url-modal/add-short-url-modal.component';
import { FormsModule } from '@angular/forms';
import { CreateShortUrlModel } from '../../Models/CreateShortUrlModel';

@Component({
  selector: 'app-display-short-urls',
  imports: [
    CommonModule,
    FormsModule,
    AddShortUrlModalComponent
  ],
  standalone: true,
  templateUrl: './display-short-urls.component.html',
  styleUrls: ['./display-short-urls.component.css']
})
export class DisplayShortUrlsComponent {
  receivedInfo: ShortUrlModel[] = [];

  isModalOpen = false;
  modalErrorMessage: string = '';

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
    this.isModalOpen = true;
    this.modalErrorMessage = '';
  }

  onModalAdd(url: string): void {
    const createModel: CreateShortUrlModel = { longUrl: url };

    this.shortUrlService.addNewShortUrl(createModel).subscribe({
      next: (newShortUrl) => {
        this.receivedInfo = [newShortUrl, ...this.receivedInfo];
        this.isModalOpen = false;
        this.modalErrorMessage = '';
      },
      error: (err) => {
        this.modalErrorMessage = err?.error?.message || 'Error adding short URL';
      }
    });
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.modalErrorMessage = '';
  }
  
  onView(url: any): void {
    // TODO: подключи вывод деталей
  }

  onDelete(url: any): void {
    // TODO: подключи удаление
  }
}
