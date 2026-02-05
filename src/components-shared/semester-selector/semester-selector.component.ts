import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDataService } from '../../services/course-data.service';

/**
 * Semester selector dropdown component
 */
@Component({
  selector: 'app-semester-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semester-selector.component.html'
})
export class SemesterSelectorComponent {
  private courseData = inject(CourseDataService);

  semesters = this.courseData.semestersSignal;
  activeSemester = this.courseData.activeSemester;

  onSemesterChange(semesterId: string) {
    const id = parseInt(semesterId, 10);
    // Update the active semester by setting isCurrent flag
    this.courseData.semestersSignal.update(semesters =>
      semesters.map(s => ({
        ...s,
        isCurrent: s.id === id
      }))
    );
  }
}
