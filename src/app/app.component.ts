import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppRouterDefinitions } from './RouterDefinitions/app.router.definitions';
import { AppHeaderComponent } from './Components/app-header/app-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppHeaderComponent,
    CommonModule
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TestTaskURLShorterAngularApp';
  currentRoute: string = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  shouldShowHeaderFooter(): boolean {
    return ![AppRouterDefinitions.Login, AppRouterDefinitions.Register]
      .map(route => '/' + route.toString())
      .includes(this.currentRoute);
  }
}
