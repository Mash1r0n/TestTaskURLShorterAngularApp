import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiRouterDefinitions } from '../../RouterDefinitions/api.router.definitions';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

@Component({
  selector: 'app-url-redirect',
  standalone: true,
  template: `<p class="redirect-msg">🔁 Redirecting...</p>`,
  styles: [`
    .redirect-msg {
      text-align: center;
      margin-top: 100px;
      font-size: 1.2rem;
      color: #555;
    }
  `]
})
export class UrlRedirectComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');

    if (!code) {
      this.router.navigate([AppRouterDefinitions.ShortUrls]);
      return;
    }

    this.http.get(ApiRouterDefinitions.RedirectByCodeAPI + code, { responseType: 'text' })
      .subscribe({
        next: (longUrl) => {
          window.location.href = longUrl;
        },
        error: (err) => {
          alert('🔴 Failed to redirect: ' + (err.error || 'Unknown error'));
          this.router.navigate([AppRouterDefinitions.ShortUrls]);
        }
      });
  }
}
