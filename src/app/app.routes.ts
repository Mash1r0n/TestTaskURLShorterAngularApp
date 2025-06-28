import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayShortUrlsComponent } from './Pages/display-short-urls/display-short-urls.component'
import { AppRouterDefinitions } from './RouterDefinitions/app.router.definitions';

export const routes: Routes = [
  { path: AppRouterDefinitions.ShortUrls, component: DisplayShortUrlsComponent },
  { path: '**', redirectTo: AppRouterDefinitions.ShortUrls, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }