import { Component } from '@angular/core';
import { ShourtUrlService } from '../../Services/short-url/shourt-url.service';
import { ShortUrlModel } from '../../Models/ShortUrlModel';
import { CommonModule } from '@angular/common';
import { AddShortUrlModalComponent } from '../../Components/add-short-url-modal/add-short-url-modal.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

@Component({
  selector: 'app-display-short-urls',
  imports: [
    CommonModule,
    FormsModule,
    AddShortUrlModalComponent,
    RouterLink
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
  isLoading: boolean = true;

  public AppRouterDefinitions = AppRouterDefinitions;

  constructor(
    private readonly shortUrlService: ShourtUrlService,
    private readonly authService: AuthService) 
  {
    this.shortUrlService.getAllShortUrls().subscribe({
      next: (data: ShortUrlModel[]) => {
        this.receivedInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching short URLs:', error);
        this.errorMessage = 'Failed to load short URLs';
        this.isLoading = false;
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

  onModalAdd(longUrl: string): void {
    this.shortUrlService.addNewShortUrl({ longUrl }).subscribe({
      next: (newShortUrl) => {
        this.receivedInfo = [newShortUrl, ...this.receivedInfo];
        this.modalErrorMessage = '';
        this.isModalOpen = false;
      },
      error: (err) => {
        this.modalErrorMessage = err?.error || 'Something went wrong';
      }
    });
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.modalErrorMessage = '';
  }
  
  onView(id: string): void {
    window.location.href = `/short-url/${id}`;
  }

  onDelete(code: string): void {
    this.shortUrlService.deleteShortUrlByCode(code).subscribe({
      next: () => {
        this.receivedInfo = this.receivedInfo.filter(url => url.code !== code);
      },
      error: (err) => {
        this.errorMessage = err?.error || 'Something went wrong';
      }
    });
  }
}
