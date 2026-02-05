import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDataService } from '../../services/course-data.service';

/**
 * Progress tracker component showing course completion and GPA
 */
@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.component.html'
})
export class ProgressTrackerComponent {
  private readonly courseData = inject(CourseDataService);

  activeSemester = this.courseData.activeSemester;
  semesters = this.courseData.semestersSignal;

  activeCourseCount = computed(() => this.courseData.activeCourses().length);

  // Calculate semester GPA
  semesterGPA = computed(() => {
    const courses = this.courseData.activeCourses();
    if (courses.length === 0) return 0;

    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.currentGrade !== null) {
        const gradePoints = this.gradeToGPA(course.currentGrade);
        totalGradePoints += gradePoints * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  });

  // Calculate overall completion rate
  completionRate = computed(() => {
    const courses = this.courseData.activeCourses();
    if (courses.length === 0) return 0;

    let totalAssignments = 0;
    let completedAssignments = 0;

    courses.forEach(course => {
      totalAssignments += course.assignments.length;
      completedAssignments += course.assignments.filter(
        a => a.status === 'graded' || a.status === 'submitted'
      ).length;
    });

    return totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;
  });

  // Get courses with progress metrics
  coursesWithProgress = computed(() => {
    return this.courseData.activeCourses().map(course => {
      const totalAssignments = course.assignments.length;
      const completedAssignments = course.assignments.filter(
        a => a.status === 'graded' || a.status === 'submitted'
      ).length;
      const gradedCount = course.assignments.filter(a => a.status === 'graded').length;
      const pendingCount = course.assignments.filter(a => a.status === 'pending').length;
      const completionPercentage = totalAssignments > 0 
        ? (completedAssignments / totalAssignments) * 100 
        : 0;

      return {
        ...course,
        totalAssignments,
        completedAssignments,
        gradedCount,
        pendingCount,
        completionPercentage
      };
    });
  });

  // Convert percentage grade to GPA
  gradeToGPA(grade: number): number {
    if (grade >= 93) return 4;
    if (grade >= 90) return 3.7;
    if (grade >= 87) return 3.3;
    if (grade >= 83) return 3;
    if (grade >= 80) return 2.7;
    if (grade >= 77) return 2.3;
    if (grade >= 73) return 2;
    if (grade >= 70) return 1.7;
    if (grade >= 67) return 1.3;
    if (grade >= 63) return 1;
    if (grade >= 60) return 0.7;
    return 0;
  }

  getGPAClass(gpa: number): string {
    if (gpa >= 3.5) return 'excellent';
    if (gpa >= 3) return 'good';
    if (gpa >= 2.5) return 'average';
    return 'poor';
  }

  getGradeClass(grade: number | null): string {
    if (grade === null) return '';
    if (grade >= 90) return 'excellent';
    if (grade >= 80) return 'good';
    if (grade >= 70) return 'average';
    return 'poor';
  }

  getProgressBarClass(percentage: number): string {
    if (percentage >= 75) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }
}
