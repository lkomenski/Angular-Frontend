# Course Manager for Students

A modern Angular application for managing college courses, tracking assignments, calculating grades, and monitoring academic progress. Built with Angular 21, leveraging Signals for reactive state management and Reactive Forms for dynamic user input.

## Features

### Course Management
- Create and organize courses with associated resources and materials
- Track course details including code, name, instructor, and semester
- Attach URLs for syllabi, slides, and supplementary learning materials
- View detailed course information and edit as needed
- Search and filter courses by name or code

### Assignment Tracking
- Centralized view of all assignments across courses
- Advanced filtering by status (pending, submitted, graded, overdue)
- Course-specific filtering and sorting options
- Status management with inline updates
- Due date tracking with urgency indicators
- Real-time statistics dashboard

### Grade Calculator
- Project final grades using hypothetical score scenarios
- Enter and adjust assignment scores dynamically
- Real-time grade projections with instant feedback
- Comparison analysis against current and target grades
- Automatic letter grade conversion
- Reset functionality to restore actual scores

### Progress Tracker
- Comprehensive semester GPA and completion rate monitoring
- Per-course progress visualization with completion percentages
- Detailed performance metrics including graded, pending, and target grades
- Historical semester timeline with GPA trends
- Visual performance indicators
- Course-by-course grade tracking

### Notifications System
- Priority-based notification management (high, medium, low)
- Upcoming assignment reminders and alerts
- Individual or bulk notification dismissal
- Actionable links directing to relevant application pages
- Relative time formatting for temporal context
- Weekly assignment summary overview

### Semester Management
- Semester switching via dropdown selector
- Semester-specific data filtering and display
- GPA, course count, and credit tracking per semester
- Current semester identification and highlighting

## Technical Implementation

### Core Technologies
- **Angular 21** – Standalone components architecture
- **TypeScript** – Strict typing with comprehensive interfaces
- **Angular Signals** – Reactive state management
- **Reactive Forms** – Dynamic forms with validation
- **Angular Router** – Client-side routing with parameters

### Architecture & Patterns
- Signal-based state management via centralized CourseDataService
- Computed signals for derived state calculations
- Semantic HTML with ARIA attributes for accessibility
- Responsive design with flexible layouts
- Custom form validators for URL validation and code patterns
- FormArray implementation for dynamic resource management
- Route guards for access control

### Accessibility & Standards
- Semantic HTML elements (main, section, article, nav, header, aside)
- Comprehensive ARIA labels and descriptions
- Screen reader support with visually hidden elements
- Logical heading hierarchy
- Keyboard navigation support
- Skip links for main content access

## Project Structure

```
src/
├── pages/                          # Feature pages
│   ├── home/                       # Dashboard with statistics and search
│   ├── list/                       # Course listing
│   ├── detail/                     # Course detail view
│   ├── edit/                       # Course creation and editing
│   ├── admin/                      # Analytics and tools dashboard
│   └── assignments/                # Assignment tracking interface
├── components-shared/              # Reusable components
│   ├── card/                       # Layout wrapper
│   ├── table/                      # Data table
│   ├── form-field/                 # Form input with validation
│   ├── data-collection-form/       # Course form
│   ├── grade-calculator/           # Grade projection tool
│   ├── progress-tracker/           # Progress visualization
│   ├── notifications/              # Notification center
│   └── semester-selector/          # Semester dropdown
├── services/
│   └── course-data.service.ts      # Centralized state management
├── models/
│   └── course.model.ts             # TypeScript interfaces
├── guards/
│   └── auth.guard.ts               # Route protection
└── app/
    ├── app.ts                      # Root component
    ├── app.routes.ts               # Routing configuration
    └── app.config.ts               # Application configuration
```

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lkomenski/Angular-Frontend.git
cd Angular-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Navigate to `http://localhost:4200` in your browser.

### Available Commands

```bash
npm start          # Start development server
npm test           # Run unit tests
npm run build      # Build for production
npm run watch      # Build in watch mode
```

## Application Routes

### Dashboard (/)
Landing page featuring course statistics, search functionality with live filtering, recent courses sidebar, and quick navigation to primary application features.

### My Courses (/list)
Tabular view of all courses with sortable columns and quick access to course details and management actions.

### Assignments (/assignments)
Comprehensive assignment tracking interface with multi-dimensional filtering (status, course), sorting capabilities, and inline status management.

### Add Course (/create)
Course creation interface with validated form inputs and dynamic resource URL management.

### Course Detail (/detail/:id)
Detailed view of individual course information including all associated resources and materials.

### Edit Course (/edit/:id)
Course modification interface allowing updates to course information and resource management.

### Admin Tools (/admin)
Analytics dashboard providing access to grade calculator, progress tracker, and notification center.

## Design & User Experience

The application employs modern design patterns including glass-morphism UI elements, gradient backgrounds with animated components, color-coded categorization system, responsive grid and sidebar layouts, CSS custom properties for consistent theming, and smooth transitions for enhanced user interaction.

## Data Architecture

### State Management
The application utilizes a centralized CourseDataService implementing signal-based reactive state management. This service provides mock data for courses, assignments, semesters, and notifications, along with CRUD operations and computed signals for derived data calculations.

### Data Models
- **Course** – Course information with associated assignments
- **Assignment** – Assignment details including status and grades
- **Semester** – Semester data with GPA and credit information
- **Notification** – Notification with priority levels and action links
- **Stats** – Dashboard statistics

## Future Development

Planned enhancements include backend API integration, user authentication and authorization, database persistence, file upload functionality for course materials, calendar view for assignment management, email notification system, data export capabilities (PDF/CSV), dark mode theme implementation, and mobile application development.

## License

This project is open source and available under the MIT License.

## Author

**lkomenski**  
GitHub: [@lkomenski](https://github.com/lkomenski)
