import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayShortUrlsComponent } from './Pages/display-short-urls/display-short-urls.component'

export const routes: Routes = [
  { path: 'ShortUrls', component: DisplayShortUrlsComponent },
  { path: '**', redirectTo: 'ShortUrls', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }