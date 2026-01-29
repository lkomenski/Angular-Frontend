# Angular Frontend Routing Assignment

This project is a basic Angular application created to demonstrate core Angular routing concepts and component organization.

## Assignment Objectives Met

### Routing & Navigation
- Angular Router is configured using `app.routes.ts`.
- Internal navigation is implemented using `routerLink`.
- An external site link (Angular Docs) is included using a standard anchor tag.

### Reactive Forms
- Implements a model-driven form using Angular Reactive Forms.
- A reusable form field component renders individual inputs and validation messages.
- A data collection form component owns the `FormGroup`, validation rules, and submit logic.
- Includes built-in, custom, and asynchronous validation.
- Demonstrates dynamic form sections using `FormArray`.
- On submit, the form validates input and logs the collected data.

### Core Pages
The application includes the following stub pages, all connected through the Angular Router:
- **Home** – landing page with navigation links
- **List** – displays a small set of sample items
- **Detail** – displays dynamic data using a route parameter (`:id`)
- **Create/Edit** – shared page for creating or editing an item

### Route Parameters
- Dynamic routing is implemented using a route parameter (`/detail/:id`).
- The Detail and Edit pages read the parameter from the URL and display it.

### Route Guards
- A placeholder authentication guard is implemented.
- The Create/Edit routes are protected using this guard.

### Project Organization
- The project is organized by feature folders:
  - `/home`
  - `/list`
  - `/detail`
  - `/edit`
- Shared, reusable UI components are grouped under `/components-shared`.

### Reusable UI Components
Reusable components are implemented using Angular’s component architecture and used across multiple pages:
- **Card** – layout wrapper for page content
- **Table** – displays tabular data on the List page
- **Form Field** – reusable labeled input component for Reactive Forms
- **Data Collection Form** – Reactive Form component with validation and dynamic fields

### Architecture
- Uses Angular 21’s standalone component architecture.
- Routing is provided via `provideRouter` in `main.ts`.

## Development Server

To run the application locally:

```bash
ng serve
