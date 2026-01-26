import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin.html',
})
export class AdminComponent {
    liveMessage = signal('Welcome to the admin page');
    
}