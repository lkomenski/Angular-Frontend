import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components-shared/card/card.component';
import { GradeCalculatorComponent } from '../../components-shared/grade-calculator/grade-calculator.component';
import { ProgressTrackerComponent } from '../../components-shared/progress-tracker/progress-tracker.component';
import { NotificationsComponent } from '../../components-shared/notifications/notifications.component';

@Component({
  selector: 'app-admin',
  imports: [CardComponent, GradeCalculatorComponent, ProgressTrackerComponent, NotificationsComponent],
  templateUrl: './admin.html',
})
export class AdminComponent {
    liveMessage = signal('Welcome to the admin page');
    
}