import { Injectable, signal, computed } from '@angular/core';
import { Course, Semester, Assignment, Notification, Stats } from '../models/course.model';

/**
 * Mock data service for Course Manager
 * Manages courses, semesters, assignments with signals
 */
@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  // Signals for reactive state (public for component access)
  coursesSignal = signal<Course[]>(this.getInitialCourses());
  semestersSignal = signal<Semester[]>(this.getInitialSemesters());
  notificationsSignal = signal<Notification[]>([]);

  // Public readonly signals
  courses = this.coursesSignal.asReadonly();
  semesters = this.semestersSignal.asReadonly();
  notifications = this.notificationsSignal.asReadonly();

  // Computed signals
  activeSemester = computed(() => 
    this.semesters().find(s => s.isActive) || this.semesters()[0]
  );

  activeCourses = computed(() => 
    this.courses().filter(c => c.semester === this.activeSemester()?.name)
  );

  stats = computed((): Stats => {
    const active = this.activeCourses();
    const semesters = new Set(this.courses().map(c => c.semester));
    const thisWeek = this.getAssignmentsDueThisWeek().length;
    
    return {
      total: active.length,
      categories: semesters.size,
      latest: thisWeek
    };
  });

  recentCourses = computed(() => 
    [...this.courses()]
      .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
      .slice(0, 3)
  );

  constructor() {
    this.generateNotifications();
  }

  // CRUD Operations
  getCourseById(id: number): Course | undefined {
    return this.courses().find(c => c.id === id);
  }

  addCourse(course: Omit<Course, 'id' | 'updated'>): Course {
    const newCourse: Course = {
      ...course,
      id: Math.max(...this.courses().map(c => c.id), 0) + 1,
      updated: new Date().toISOString(),
      currentGrade: this.calculateCourseGrade(course.assignments)
    };
    
    this.coursesSignal.update(courses => [...courses, newCourse]);
    return newCourse;
  }

  updateCourse(id: number, updates: Partial<Course>): void {
    this.coursesSignal.update(courses => 
      courses.map(c => c.id === id 
        ? { ...c, ...updates, updated: new Date().toISOString() }
        : c
      )
    );
  }

  deleteCourse(id: number): void {
    this.coursesSignal.update(courses => courses.filter(c => c.id !== id));
  }

  // Assignment Operations
  addAssignment(courseId: number, assignment: Omit<Assignment, 'id' | 'courseId'>): void {
    this.coursesSignal.update(courses => 
      courses.map(course => {
        if (course.id === courseId) {
          const newAssignment: Assignment = {
            ...assignment,
            id: Math.max(...course.assignments.map(a => a.id), 0) + 1,
            courseId
          };
          const updatedAssignments = [...course.assignments, newAssignment];
          return {
            ...course,
            assignments: updatedAssignments,
            currentGrade: this.calculateCourseGrade(updatedAssignments),
            updated: new Date().toISOString()
          };
        }
        return course;
      })
    );
    this.generateNotifications();
  }

  updateAssignment(courseId: number, assignmentId: number, updates: Partial<Assignment>): void {
    this.coursesSignal.update(courses => 
      courses.map(course => {
        if (course.id === courseId) {
          const updatedAssignments = course.assignments.map(a => 
            a.id === assignmentId ? { ...a, ...updates } : a
          );
          return {
            ...course,
            assignments: updatedAssignments,
            currentGrade: this.calculateCourseGrade(updatedAssignments),
            updated: new Date().toISOString()
          };
        }
        return course;
      })
    );
    this.generateNotifications();
  }

  // Grade Calculation
  calculateCourseGrade(assignments: Assignment[]): number | null {
    const graded = assignments.filter(a => a.pointsEarned !== null);
    if (graded.length === 0) return null;

    let totalPoints = 0;
    let earnedPoints = 0;

    graded.forEach(a => {
      totalPoints += a.pointsPossible;
      earnedPoints += a.pointsEarned!;
    });

    return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : null;
  }

  // Utility Methods
  getAssignmentsDueThisWeek(): Assignment[] {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.courses().flatMap(course => 
      course.assignments.filter(a => {
        const dueDate = new Date(a.dueDate);
        return dueDate >= now && dueDate <= weekFromNow && a.status !== 'graded';
      })
    );
  }

  searchCourses(query: string): Course[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.activeCourses();
    
    return this.courses().filter(course => 
      course.name.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.instructor.toLowerCase().includes(q)
    );
  }

  private generateNotifications(): void {
    const notifications: Notification[] = [];
    const dueThisWeek = this.getAssignmentsDueThisWeek();
    
    if (dueThisWeek.length > 0) {
      notifications.push({
        id: 1,
        type: 'assignment',
        title: 'Assignments Due This Week',
        message: `${dueThisWeek.length} assignment${dueThisWeek.length > 1 ? 's' : ''} due this week`,
        priority: 'high',
        createdAt: new Date().toISOString(),
        read: false,
        actionLink: '/assignments',
        actionText: 'View Assignments'
      });
    }

    this.notificationsSignal.set(notifications);
  }

  // Mock Data
  private getInitialSemesters(): Semester[] {
    return [
      {
        id: 1,
        name: 'Spring 2026',
        startDate: '2026-01-15',
        endDate: '2026-05-15',
        isActive: true,
        isCurrent: true,
        targetGPA: 3.5,
        currentGPA: null,
        gpa: 3.6,
        courseCount: 3,
        totalCredits: 12
      },
      {
        id: 2,
        name: 'Fall 2025',
        startDate: '2025-08-20',
        endDate: '2025-12-20',
        isActive: false,
        isCurrent: false,
        targetGPA: 3.5,
        currentGPA: 3.4,
        gpa: 3.4,
        courseCount: 4,
        totalCredits: 15
      }
    ];
  }

  private getInitialCourses(): Course[] {
    return [
      {
        id: 1,
        name: 'Introduction to Computer Science',
        code: 'CS 101',
        semester: 'Spring 2026',
        instructor: 'Dr. Johnson',
        credits: 4,
        targetGrade: 90,
        currentGrade: 87.5,
        color: '#4d7cff',
        updated: '2026-01-28',
        assignments: [
          {
            id: 1,
            courseId: 1,
            name: 'Homework 1: Variables & Data Types',
            dueDate: '2026-02-01',
            category: 'homework',
            pointsEarned: 95,
            pointsPossible: 100,
            weight: 10,
            status: 'graded'
          },
          {
            id: 2,
            courseId: 1,
            name: 'Quiz 1: Basics',
            dueDate: '2026-02-05',
            category: 'quiz',
            pointsEarned: 80,
            pointsPossible: 100,
            weight: 5,
            status: 'graded'
          },
          {
            id: 3,
            courseId: 1,
            name: 'Project 1: Calculator App',
            dueDate: '2026-02-15',
            category: 'project',
            pointsEarned: null,
            pointsPossible: 200,
            weight: 25,
            status: 'pending'
          }
        ],
        resources: [
          { id: 1, name: 'Course Syllabus', url: '/syllabus.pdf', type: 'syllabus' },
          { id: 2, name: 'Python Documentation', url: 'https://docs.python.org', type: 'other' }
        ]
      },
      {
        id: 2,
        name: 'Calculus II',
        code: 'MATH 152',
        semester: 'Spring 2026',
        instructor: 'Prof. Smith',
        credits: 4,
        targetGrade: 85,
        currentGrade: 92,
        color: '#ff4b4b',
        updated: '2026-01-27',
        assignments: [
          {
            id: 4,
            courseId: 2,
            name: 'Homework 1: Integration',
            dueDate: '2026-01-30',
            category: 'homework',
            pointsEarned: 46,
            pointsPossible: 50,
            weight: 10,
            status: 'graded'
          },
          {
            id: 5,
            courseId: 2,
            name: 'Midterm Exam',
            dueDate: '2026-03-15',
            category: 'exam',
            pointsEarned: null,
            pointsPossible: 100,
            weight: 30,
            status: 'pending'
          }
        ],
        resources: [
          { id: 3, name: 'Textbook PDF', url: '/calc2-book.pdf', type: 'textbook' }
        ]
      },
      {
        id: 3,
        name: 'English Composition',
        code: 'ENG 201',
        semester: 'Spring 2026',
        instructor: 'Dr. Williams',
        credits: 3,
        targetGrade: 88,
        currentGrade: null,
        color: '#c43cff',
        updated: '2026-01-26',
        assignments: [
          {
            id: 6,
            courseId: 3,
            name: 'Essay 1: Personal Narrative',
            dueDate: '2026-02-10',
            category: 'project',
            pointsEarned: null,
            pointsPossible: 100,
            weight: 20,
            status: 'pending'
          }
        ],
        resources: []
      }
    ];
  }
}
