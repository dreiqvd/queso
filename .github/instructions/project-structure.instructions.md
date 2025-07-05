# Project Structure and File Naming Conventions

## Nx Workspace Structure

```
queso/
├── apps/                     # Applications
│   ├── cashflow/            # Angular app
│   ├── nearbai/             # Angular app
│   ├── portfolio/           # Angular app
│   └── wedsite/             # Angular app
├── libs/                    # Shared libraries
│   ├── common/              # Common utilities and services
│   ├── shared/              # Shared assets and styles
│   └── ui-kit/              # Reusable UI components
├── .cursorrules/            # AI coding instructions
└── [config files]          # Root configuration files
```

## File Naming Conventions

### General Rules

- Use kebab-case for all file and directory names
- Be descriptive and avoid abbreviations
- Include file type in name when beneficial
- No spaces or special characters except hyphens

### Angular Components

```
// New Angular 20+ convention (remove .component)
my-component.ts
my-component.html
my-component.scss

// Old convention (avoid)
my-component.component.ts
```

### Services and Utilities

```
user.service.ts
api.client.ts
validation.util.ts
auth.guard.ts
user.model.ts
app.config.ts
```

### Test Files

```
user.service.spec.ts
my-component.spec.ts
integration.test.ts
e2e.test.ts
```

## Directory Structure Patterns

### Application Structure

```
apps/app-name/
├── src/
│   ├── app/
│   │   ├── components/      # Shared components
│   │   ├── pages/           # Route components
│   │   ├── services/        # App-specific services
│   │   ├── models/          # Type definitions
│   │   ├── guards/          # Route guards
│   │   └── pipes/           # Custom pipes
│   ├── assets/              # Static assets
│   ├── environments/        # Environment configs
│   └── styles.scss          # Global styles
├── project.json             # Nx project config
├── tailwind.config.js       # Tailwind config
└── tsconfig.*.json          # TypeScript configs
```

### Library Structure

```
libs/library-name/
├── src/
│   ├── component-name/      # Individual components
│   │   ├── component.ts
│   │   ├── index.ts
│   │   └── public-api.ts
│   ├── services/            # Library services
│   ├── models/              # Type definitions
│   ├── utils/               # Utility functions
│   └── index.ts             # Main exports
├── ng-package.json          # Angular package config
├── package.json             # Library package.json
├── project.json             # Nx project config
└── README.md                # Library documentation
```

### Component Directory Structure

```
component-name/
├── component-name.ts        # Main component
├── component-name.html      # Template (if external)
├── component-name.scss      # Styles (if external)
├── component-name.spec.ts   # Unit tests
├── index.ts                 # Barrel export
├── public-api.ts            # Public API exports
└── README.md                # Component documentation
```

## Import Path Conventions

### Absolute Imports (Preferred)

```typescript
// Library imports
import { UserService } from '@queso/common';
import { ButtonComponent } from '@queso/ui-kit/button';

// App imports
import { HomeComponent } from '@app/pages/home';
import { AuthService } from '@app/services/auth';
```

### Relative Imports

```typescript
// Same directory
import { UserModel } from './user.model';

// Parent directory
import { BaseComponent } from '../base.component';

// Sibling directories
import { UserService } from '../services/user.service';
```

## Naming Conventions by Type

### Classes

```typescript
// PascalCase
class UserService {}
class PaymentProcessor {}
class ApiHttpClient {}
```

### Interfaces and Types

```typescript
// PascalCase, no prefix
interface User {}
interface ApiResponse<T> {}
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### Constants and Enums

```typescript
// SCREAMING_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// PascalCase for enums
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}
```

### Functions and Variables

```typescript
// camelCase
const userData = getUserData();
const isAuthenticated = checkAuthStatus();

function calculateTotal(items: Item[]): number {}
const processPayment = async (amount: number): Promise<void> => {};
```

### CSS Classes

```scss
// kebab-case with BEM methodology
.user-profile {
}
.user-profile__avatar {
}
.user-profile--highlighted {
}

// Component-specific prefix
.qs-button {
}
.qs-button--primary {
}
.qs-button--disabled {
}
```

## Asset Organization

### Images and Media

```
assets/
├── images/
│   ├── icons/               # SVG icons
│   ├── logos/               # Brand assets
│   ├── backgrounds/         # Background images
│   └── photos/              # Photography
├── fonts/                   # Custom fonts
├── data/                    # JSON data files
└── styles/                  # Global SCSS files
```

### Asset Naming

```
// Descriptive, kebab-case
hero-background.jpg
user-avatar-placeholder.svg
company-logo-dark.png
icon-chevron-down.svg
```

## Configuration Files

### Root Level

```
package.json                 # Main package file
nx.json                      # Nx workspace config
tsconfig.base.json           # Base TypeScript config
eslint.config.js             # ESLint configuration
jest.config.ts               # Jest testing config
tailwind.config.js           # Tailwind CSS config
```

### Application Level

```
project.json                 # Nx project configuration
tsconfig.app.json            # App TypeScript config
tsconfig.spec.json           # Test TypeScript config
tailwind.config.js           # App-specific Tailwind config
```

## Documentation Structure

### README Files

- Every library should have a README.md
- Include installation, usage, and API documentation
- Provide examples and common use cases

### Code Comments

```typescript
/**
 * Service for managing user authentication and authorization.
 *
 * Handles login, logout, token refresh, and role-based access control.
 * Integrates with Firebase Auth and custom backend services.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Implementation
}
```

## Barrel Exports

### index.ts Pattern

```typescript
// libs/ui-kit/src/index.ts
export * from './button';
export * from './input';
export * from './modal';

// libs/ui-kit/src/button/index.ts
export * from './public-api';

// libs/ui-kit/src/button/public-api.ts
export * from './button.component';
export * from './button.types';
```

This structure enables clean imports:

```typescript
import { ButtonComponent, InputComponent } from '@queso/ui-kit';
```
