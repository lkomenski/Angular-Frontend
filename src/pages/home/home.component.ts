import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components-shared/card/card.component';
import { DataCollectionFormComponent } from '../../components-shared/data-collection-form/data-collection-form.component';
import { CourseDataService } from '../../services/course-data.service';
import { Course } from '../../models/course.model';

// Type definition for Item objects (for search compatibility)
type Item = { id: number; name: string; category: string; updated: string };

/**
 * Home component with Angular Signals and course data integration
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CardComponent, DataCollectionFormComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Inject course data service
  private courseData = inject(CourseDataService);

  // Use service signals
  liveMessage = signal('Welcome to Course Manager');
  stats = this.courseData.stats;
  recent = this.courseData.recentCourses;
  
  // Search functionality
  query = signal('');
  filtered = signal<Course[]>([]);

  showTips = signal(false);

  clearSearch() {
    this.query.set('');
    this.filtered.set([]);
  }

  setQuery(value: string) {
    this.query.set(value);
    if (value.trim()) {
      this.filtered.set(this.courseData.searchCourses(value));
    } else {
      this.filtered.set([]);
    }
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
    }
  }

  toggleTips() {
    this.showTips.update(current => !current);
  }
}

// Export as both Home and HomeComponent for compatibility
export { HomeComponent as Home };
