import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { GuideMetricComponent } from "./guides/pages/guide-metric/guide-metric.component";
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'configuration', component: AboutComponent },
  { path: 'guides/guide_metric', component: GuideMetricComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];
