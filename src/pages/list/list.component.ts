import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../../components-shared/card/card.component';
import { TableComponent } from '../../components-shared/table/table.component';
import { CourseDataService } from '../../services/course-data.service';
import { Course } from '../../models/course.model';

/**
 * List component displaying all courses with filtering
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CardComponent, TableComponent],
  templateUrl: './list.html',
})
export class ListComponent {
  query = signal('');

  columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Course Name' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'semester', label: 'Semester' },
    { key: 'grade', label: 'Grade' },
  ];

  // ==================== DEPENDENCY INJECTION ====================
  
  constructor(
    private router: Router,
    private courseData: CourseDataService
  ) {}

  // Get courses with grade information
  rows = computed(() => {
    return this.courseData.activeCourses().map(course => ({
      ...course,
      grade: this.formatGrade(this.courseData.calculateCourseGrade(course.assignments))
    }));
  });

  /** Computed property for reactive filtering */
  filteredRows = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.rows();
    return this.rows().filter(
      (course) =>
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
        course.semester.toLowerCase().includes(q)
    );
  });

  // ==================== HELPER METHODS ====================

  formatGrade(grade: number | null): string {
    if (grade === null) return 'N/A';
    return `${grade.toFixed(1)}%`;
  }

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigates to the detail page for the selected item
   * Demonstrates programmatic navigation with route parameters
   */
  openDetail(row: any) {
    this.router.navigate(['/detail', row.id]);
  }
}
