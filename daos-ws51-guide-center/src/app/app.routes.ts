import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { GuideManagementComponent } from "./guides/pages/guide-management/guide-management.component";
import { SignOffComponent } from "./guides/components/sign-off/sign-off.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sign-off', component: SignOffComponent },
  { path: 'turistic/guides', component: GuideManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
