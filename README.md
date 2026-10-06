# Advanced Dog Viewer

Advanced Dog Viewer is the actively developed extension of the original Dog Viewer coding assignment. The original repository intentionally preserves the limited assignment implementation; this repository is where the application is developed incrementally beyond that scope.

## Project relationship

### Original Dog Viewer

- **GitHub Repository:** [ParkhomenkoAlex/dog-viewer](https://github.com/ParkhomenkoAlex/dog-viewer)
- **Live Demo:** [dog-viewer-kappa.vercel.app](https://dog-viewer-kappa.vercel.app)

### Advanced Dog Viewer

- **GitHub Repository:** [ParkhomenkoAlex/advanced-dog-viewer](https://github.com/ParkhomenkoAlex/advanced-dog-viewer)
- **Live Demo:** [advanced-dog-viewer.vercel.app](https://advanced-dog-viewer.vercel.app/)

> ⚠️ **Work in Progress**
>
> Advanced Dog Viewer is being developed incrementally according to the roadmap below. This README reflects the current state of the project and will evolve with the application.
>
> Once the planned development workflow is complete, this README will be revised and expanded to document the final application, architecture, features, testing strategy, and production setup.

## Current Project Overview

The application fetches dog images from the Dog CEO API and presents them in a selectable gallery. Users can select dogs from the gallery, navigate through the current result set with previous and next controls, filter by breed and sub-breed through searchable selectors, choose 10, 20, 30, or 50 dogs, reset filters, and refresh the current result set. Favorites can be toggled, selected, removed, cleared, and restored from `localStorage` after a reload.

The current implementation uses React, TypeScript, Vite, and TanStack Query. It includes loading and error feedback, accessible labels and focus styles for the current controls, and responsive layouts for the filter panel, gallery, and sidebar.

## Development Roadmap

### 1. Architecture & Refactoring

- ✅ Project structure refactoring
- ✅ Separation of responsibilities
- ✅ Reusable components and hooks
- ✅ API/service layer organization
- ✅ Architecture prepared for further development

### 2. TanStack Query / Server State

- ✅ TanStack Query integration
- ✅ API requests migrated to query-based server state
- ✅ Loading states
- ✅ Error handling
- ✅ Refetch / refresh behavior

### 3. Breeds, Search & Filtering

- ✅ Breed selection
- ✅ Sub-breed selection
- ✅ Searchable breed selector
- ✅ Dog count selection (10 / 20 / 30 / 50)
- ✅ Reset filters
- ✅ Refresh dogs

### 4. Advanced Gallery

- Load More
- Image deduplication
- ✅ Next / Previous navigation
- Random Dog
- Fullscreen / modal image view
- Share functionality

### 5. Favorites 2.0

- ✅ Favorites functionality
- ✅ Favorites persistence with `localStorage`
- ✅ Favorites counter
- ✅ Clear all favorites
- ✅ Favorite toggle

### 6. Routing & Shareable URL State

- Application routing
- Shareable URL state
- Preserve relevant filters/state in the URL where appropriate

### 7. UI Redesign & Responsive Design

- UI redesign/polish
- ✅ Responsive behavior
- Mobile experience
- General UX improvements

### 8. Accessibility & Application States

- Accessibility improvements
- Empty states
- ✅ Loading states
- ✅ Error states
- Error recovery where appropriate

### 9. Testing

- Unit tests
- Component tests
- Critical user-flow tests

### 10. CI/CD

- Automated checks
- Build/test pipeline
- Deployment workflow

### 11. PWA & Production Polish

- PWA-related improvements
- Performance optimization
- Production optimization
- Final application polish

## Getting Started

Install dependencies with the package manager used by the repository:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run the available checks and create a production build:

```bash
pnpm lint
pnpm build
```

Preview a production build locally:

```bash
pnpm preview
```