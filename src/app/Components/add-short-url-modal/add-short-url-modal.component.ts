import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShourtUrlService } from '../../Services/short-url/shourt-url.service';

@Component({
  selector: 'app-add-short-url-modal',
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './add-short-url-modal.component.html',
  styleUrls: ['./add-short-url-modal.component.css'],
  standalone: true
})
export class AddShortUrlModalComponent {
  urlInput: string = '';
  
  errorMessage: string = '';

  @Output() add = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  constructor(private shortUrlService: ShourtUrlService) {}

  onAddClick(): void {
  this.shortUrlService.addNewShortUrl({ longUrl: this.urlInput }).subscribe({
    next: (newUrl) => {
      this.close.emit();
    },
    error: (err) => {
      this.errorMessage = err?.error || 'Something went wrong';
    }
  });
}

  onCloseClick(): void {
    this.close.emit();
    this.urlInput = '';
  }
}
