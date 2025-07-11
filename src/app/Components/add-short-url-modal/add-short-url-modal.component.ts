import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-short-url-modal',
  standalone: true,
  templateUrl: './add-short-url-modal.component.html',
  styleUrls: ['./add-short-url-modal.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AddShortUrlModalComponent {
  urlInput: string = '';

  @Input() errorMessage: string = '';

  @Output() add = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  onAddClick(): void {
    this.add.emit(this.urlInput);
  }

  onCloseClick(): void {
    this.close.emit();
    this.urlInput = '';
  }
}
