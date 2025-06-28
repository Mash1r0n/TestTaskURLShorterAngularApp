import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouterDefinitions } from './RouterDefinitions/app.router.definitions';
import { DisplayShortUrlsComponent } from './Pages/display-short-urls/display-short-urls.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
  { path: AppRouterDefinitions.ShortUrls, component: DisplayShortUrlsComponent },
  { path: AppRouterDefinitions.Login, component: LoginComponent },
  { path: AppRouterDefinitions.Register, component: RegisterComponent },
  { path: '**', redirectTo: AppRouterDefinitions.Register, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }