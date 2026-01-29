# Angular Frontend Application

Modern Angular application demonstrating routing, reactive forms, and component architecture.

## Implementation

### Routing & Navigation
- Router configuration in `app.routes.ts`
- Internal navigation with `routerLink`
- External links with standard anchor tags
- Route parameters (`/detail/:id`, `/edit/:id`)
- Route guards protecting Create/Edit routes

### Reactive Forms
- FormGroup with FormControl elements and validation
- Reusable form field component with error handling
- Built-in, custom, and asynchronous validators
- Dynamic FormArray sections
- Form validation and data collection

### Application Pages
- **Home** – landing page with dashboard and navigation
- **List** – item listing with search functionality
- **Detail** – item details with route parameters
- **Create/Edit** – shared form component for item management
- **Admin** – protected admin dashboard

### Project Structure
```
src/
├── pages/              # Feature pages (home, list, detail, edit, admin)
├── components-shared/  # Reusable UI components
├── guards/            # Route guards
└── app/              # App configuration and routing
```

### Reusable Components
- **Card** – layout wrapper with content projection
- **Table** – data display with sorting and row selection
- **Form Field** – input component with validation integration
- **Data Collection Form** – complete form with dynamic fields

### Technical Stack
- Angular 21 standalone components
- Angular Signals for state management
- Reactive Forms with custom validation
- TypeScript with strict typing
- Accessibility-compliant markup

## Development

Start the development server:
```bash
npm install
ng serve
```

Application runs at `http://localhost:4200`
