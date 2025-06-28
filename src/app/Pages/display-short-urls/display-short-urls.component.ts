import { Component } from '@angular/core';
import { ShourtUrlService } from '../../Services/short-url/shourt-url.service';
import { ShortUrlModel } from '../../Models/ShortUrlModel';
import { CommonModule } from '@angular/common';
import { AddShortUrlModalComponent } from '../../Components/add-short-url-modal/add-short-url-modal.component';
import { FormsModule } from '@angular/forms';
import { CreateShortUrlModel } from '../../Models/CreateShortUrlModel';
import { AuthService } from '../../Services/auth/auth.service';

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
  errorMessage: string = '';

  constructor(private readonly shortUrlService: ShourtUrlService, private readonly authService: AuthService) {
    this.shortUrlService.getAllShortUrls().subscribe({
      next: (data: ShortUrlModel[]) => {
        this.receivedInfo = data;
      },
      error: (error) => {
        console.error('Error fetching short URLs:', error);
      }
    });
  }

  getUserId(): string {
    const user = localStorage.getItem('user');
    console.log('User:', user);
    return user ? JSON.parse(user).userId : '';
  }

  isUserAdmin(): boolean {
    const user = localStorage.getItem('user');
    console.log('User:', user);
    return user ? JSON.parse(user).isUserAdmin : false;
  }

  isUserAuthorized(): boolean {
    return this.authService.isAuthenticated();
  }

  isUserAllowedToDelete(creatorUrlUserId: string): boolean {
    return (this.isUserAdmin() || this.getUserId() === creatorUrlUserId) && this.isUserAuthorized();
  }

  onAddUrl(): void {
    this.isModalOpen = true;
    this.modalErrorMessage = '';
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.modalErrorMessage = '';
  }
  
  onView(url: ShortUrlModel): void {
    // TODO: подключи вывод деталей
  }

  onDelete(code: string): void {
    this.shortUrlService.deleteShortUrlByCode(code).subscribe({
      error: (err) => {
        this.errorMessage = err?.error || 'Something went wrong';
      }
  });
  }
}
