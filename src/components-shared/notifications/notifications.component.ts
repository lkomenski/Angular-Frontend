import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseDataService } from '../../services/course-data.service';

/**
 * Notifications component showing upcoming assignments and alerts
 */
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  private courseData = inject(CourseDataService);

  notifications = this.courseData.notificationsSignal;

  // Get assignments due this week with course names
  upcomingAssignments = computed(() => {
    const assignments = this.courseData.getAssignmentsDueThisWeek();
    const courses = this.courseData.activeCourses();
    
    return assignments.map(assignment => {
      const course = courses.find(c => c.id === assignment.courseId);
      return {
        ...assignment,
        courseName: course?.code || 'Unknown'
      };
    });
  });

  dismissNotification(id: number) {
    // Remove notification from array
    this.courseData.notificationsSignal.update(notifications =>
      notifications.filter(n => n.id !== id)
    );
  }

  clearAllNotifications() {
    this.courseData.notificationsSignal.set([]);
  }

  getNotificationIcon(type: string): string {
    const icons: Record<string, string> = {
      assignment: '📝',
      grade: '📊',
      deadline: '⏰',
      alert: '⚠️',
      success: '✅',
      info: 'ℹ️'
    };
    return icons[type] || '🔔';
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  getDayOfMonth(dateString: string): number {
    return new Date(dateString).getDate();
  }

  getMonth(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short' });
  }
}
