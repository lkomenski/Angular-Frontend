import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../components-shared/card/card.component';
import { CourseDataService } from '../../services/course-data.service';
import { Course } from '../../models/course.model';

interface WhatIfAssignment {
  id: string;
  name: string;
  category: string;
  pointsPossible: number;
  weight: number;
  hypotheticalScore: number | null;
}

/**
 * Grade calculator component for projecting final grades
 */
@Component({
  selector: 'app-grade-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './grade-calculator.component.html'
})
export class GradeCalculatorComponent {
  private courseData = inject(CourseDataService);
  protected Math = Math;

  selectedCourseId = signal<number | null>(null);
  courses = this.courseData.activeCourses;

  selectedCourse = computed(() => {
    const id = this.selectedCourseId();
    if (id === null) return null;
    return this.courses().find(c => c.id === id) || null;
  });

  // Current actual grade
  currentGrade = computed(() => {
    const course = this.selectedCourse();
    if (!course) return null;
    return this.courseData.calculateCourseGrade(course.assignments);
  });

  // Hypothetical assignments with editable scores
  whatIfAssignments = signal<WhatIfAssignment[]>([]);

  // Initialize what-if assignments when course is selected
  selectCourse(courseId: number | null) {
    this.selectedCourseId.set(courseId);
    
    if (courseId !== null) {
      const course = this.courses().find(c => c.id === courseId);
      if (course) {
        this.whatIfAssignments.set(
          course.assignments.map(a => ({
            id: String(a.id),
            name: a.name,
            category: a.category,
            pointsPossible: a.pointsPossible,
            weight: a.weight,
            hypotheticalScore: a.pointsEarned
          }))
        );
      }
    } else {
      this.whatIfAssignments.set([]);
    }
  }

  // Update hypothetical score for an assignment
  updateHypotheticalScore(assignmentId: string, value: string) {
    const score = value === '' ? null : parseFloat(value);
    this.whatIfAssignments.update(assignments =>
      assignments.map(a =>
        a.id === assignmentId ? { ...a, hypotheticalScore: score } : a
      )
    );
  }

  // Calculate projected grade based on hypothetical scores
  projectedGrade = computed(() => {
    const assignments = this.whatIfAssignments();
    if (assignments.length === 0) return 0;

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const assignment of assignments) {
      if (assignment.hypotheticalScore !== null) {
        const percentage = (assignment.hypotheticalScore / assignment.pointsPossible) * 100;
        totalWeightedScore += (percentage * assignment.weight) / 100;
        totalWeight += assignment.weight;
      }
    }

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0;
  });

  // Difference from current grade
  gradeDifference = computed(() => {
    const current = this.currentGrade();
    const projected = this.projectedGrade();
    if (current === null) return 0;
    return projected - current;
  });

  // Difference from target grade
  targetDifference = computed(() => {
    const course = this.selectedCourse();
    if (!course) return 0;
    return this.projectedGrade() - course.targetGrade;
  });

  // Reset to actual scores
  resetScores() {
    const courseId = this.selectedCourseId();
    if (courseId !== null) {
      this.selectCourse(courseId);
    }
  }

  // Get letter grade
  getLetterGrade(grade: number | null): string {
    if (grade === null) return 'N/A';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
  }

  // Get grade color class
  getGradeClass(grade: number | null): string {
    if (grade === null) return '';
    if (grade >= 90) return 'excellent';
    if (grade >= 80) return 'good';
    if (grade >= 70) return 'average';
    return 'poor';
  }
}
