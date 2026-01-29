import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components-shared/card/card.component';
import { CourseDataService } from '../../services/course-data.service';
import { Assignment } from '../../models/course.model';

/**
 * Assignments page with tracking and status management
 */
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css'
})
export class AssignmentsComponent {
  private courseData = inject(CourseDataService);

  // Filter options
  filterStatus = signal<'all' | 'pending' | 'submitted' | 'graded' | 'overdue'>('all');
  filterCourse = signal<number | null>(null);
  sortBy = signal<'dueDate' | 'course' | 'status'>('dueDate');

  // Get all assignments from active courses
  allAssignments = computed(() => {
    const courses = this.courseData.activeCourses();
    return courses.flatMap(course => 
      course.assignments.map(assignment => ({
        ...assignment,
        courseName: course.name,
        courseCode: course.code,
        courseColor: course.color
      }))
    );
  });

  // Filtered and sorted assignments
  filteredAssignments = computed(() => {
    let assignments = this.allAssignments();

    // Filter by status
    const status = this.filterStatus();
    if (status !== 'all') {
      assignments = assignments.filter(a => a.status === status);
    }

    // Filter by course
    const courseId = this.filterCourse();
    if (courseId !== null) {
      assignments = assignments.filter(a => a.courseId === courseId);
    }

    // Sort assignments
    const sortKey = this.sortBy();
    assignments = [...assignments].sort((a, b) => {
      if (sortKey === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortKey === 'course') {
        return a.courseName.localeCompare(b.courseName);
      } else {
        return a.status.localeCompare(b.status);
      }
    });

    return assignments;
  });

  // Statistics
  stats = computed(() => {
    const all = this.allAssignments();
    return {
      total: all.length,
      pending: all.filter(a => a.status === 'pending').length,
      submitted: all.filter(a => a.status === 'submitted').length,
      graded: all.filter(a => a.status === 'graded').length,
      overdue: all.filter(a => a.status === 'overdue').length
    };
  });

  // Course options for filter
  courses = this.courseData.activeCourses;

  // Methods
  setFilter(status: 'all' | 'pending' | 'submitted' | 'graded' | 'overdue') {
    this.filterStatus.set(status);
  }

  setCourseFilter(courseId: number | null) {
    this.filterCourse.set(courseId);
  }

  setSortBy(key: 'dueDate' | 'course' | 'status') {
    this.sortBy.set(key);
  }

  updateAssignmentStatus(assignmentId: number, courseId: number, status: Assignment['status']) {
    this.courseData.updateAssignment(courseId, assignmentId, { status });
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      pending: 'status-pending',
      submitted: 'status-submitted',
      graded: 'status-graded',
      overdue: 'status-overdue'
    };
    return classes[status] || '';
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      homework: '📝',
      quiz: '❓',
      exam: '📋',
      project: '🎯',
      participation: '🙋'
    };
    return icons[category] || '📄';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  getDaysUntilDue(dateString: string): number {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getGradeDisplay(assignment: Assignment): string {
    if (assignment.pointsEarned === null) return 'Not graded';
    const percentage = (assignment.pointsEarned / assignment.pointsPossible) * 100;
    return `${assignment.pointsEarned}/${assignment.pointsPossible} (${percentage.toFixed(1)}%)`;
  }
}
