import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
})
export class AdminComponent {
    liveMessage = signal('Welcome to the admin page');
    
}