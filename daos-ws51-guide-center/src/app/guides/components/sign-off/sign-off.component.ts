import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-off',
  standalone: true,
  imports: [],
  templateUrl: './sign-off.component.html',
  styleUrl: './sign-off.component.css'
})
export class SignOffComponent {
  signOff() {
    // Logic to handle sign off, e.g., clear session, redirect, etc.
    console.log('Signed off successfully');
  }
  
}
