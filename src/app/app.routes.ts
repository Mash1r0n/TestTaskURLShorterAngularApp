import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouterDefinitions } from './RouterDefinitions/app.router.definitions';
import { DisplayShortUrlsComponent } from './Pages/display-short-urls/display-short-urls.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { authGuard } from './Services/auth-guard/auth-guard.service';
import { redirectIfAuth } from './Services/redirect-if-auth/redirect-if-auth.service';
import { DisplayShortUrlInfoComponent } from './Pages/display-short-url-info/display-short-url-info.component';

export const routes: Routes = [
  { path: AppRouterDefinitions.ShortUrls, component: DisplayShortUrlsComponent },
  { path: AppRouterDefinitions.Login, component: LoginComponent, canActivate: [redirectIfAuth] },
  { path: AppRouterDefinitions.Register, component: RegisterComponent, canActivate: [redirectIfAuth] },
  { path: AppRouterDefinitions.ShortUrlInfo, component: DisplayShortUrlInfoComponent, canActivate: [authGuard] },
  {
    path: AppRouterDefinitions.RedirectUrl,
    loadComponent: () => import('./Pages/url-redirect/url-redirect.component').then(m => m.UrlRedirectComponent)
  },
  { path: '**', redirectTo: AppRouterDefinitions.ShortUrls, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }