import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignOffComponent } from './guides/components/sign-off/sign-off.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,SignOffComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  options = [
    { path: '/home', title: 'Home'},
    { path: '/turistic/guides', title: 'Guides'},
    { path: '/about', title: 'About'},
    { path: '/sign-off', title: 'Sign Off'}

  ]
  title = 'daos-ws51-guide-center';
}
