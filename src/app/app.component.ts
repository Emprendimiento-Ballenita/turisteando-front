import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { GuideListComponent } from "./guides/components/guide-list/guide-list.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderContentComponent, GuideListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'turisteando';
}
