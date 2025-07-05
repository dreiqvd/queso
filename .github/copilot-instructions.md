# GitHub Copilot Instructions for Queso Angular Nx Workspace

You are working in an Angular Nx monorepo workspace. Follow these guidelines when generating code:

## 🏗️ Project Structure

- **Workspace**: Angular Nx monorepo with multiple apps and shared libraries
- **Apps**: cashflow, nearbai, portfolio, wedsite (all Angular applications)
- **Libraries**: common (utilities), ui-kit (reusable components), shared (assets)
- **Angular Version**: 20+ (latest features and conventions)

## 📋 Component Generation Rules

### File Naming (Angular 20+)

- ❌ **Avoid**: `my-component.component.ts`
- ✅ **Use**: `my-component.ts` (remove `.component` suffix)
- Templates: `my-component.html` (if external)
- Styles: `my-component.scss` (if external)

### Component Structure Template

```typescript
import { Component, input, output, signal, afterNextRender } from '@angular/core';

@Component({
  selector: 'qs-component-name', // 'qs-' for ui-kit, 'app-' for apps
  imports: [...], // Standalone components only
  template: '...', // Single quotes, inline when simple
  styles: [...] // Inline styles preferred for ui-kit
})
export class ComponentNameComponent {
  // Signal inputs (always readonly)
  readonly inputProp = input.required<Type>();
  readonly optionalInput = input<Type>(defaultValue);

  // Signal outputs (always readonly)
  readonly eventName = output<Type>();

  // Template-accessed signals (protected readonly)
  protected readonly displayData = signal<Type>(initialValue);

  // Private internal state
  private internalState = signal<Type>(initialValue);

  constructor() {
    // Use afterNextRender for DOM/window access (SSR safe)
    afterNextRender(() => {
      // Client-side only code here
    });
  }
}
```

## 🎨 UI Kit Library Standards

### Selectors & Naming

- **Prefix**: `qs-` (e.g., `qs-button`, `qs-typewriter`)
- **Directory**: `libs/ui-kit/src/component-name/`
- **Files**: `component-name.ts`, `index.ts`, `public-api.ts`
- **Import Path**: `@queso/ui-kit/component-name`

### File Structure Pattern

```
libs/ui-kit/src/component-name/
├── component-name.ts      # Main component (no .component suffix)
├── index.ts              # Re-export from public-api
└── public-api.ts         # Export component and types
```

### Export Pattern

```typescript
// public-api.ts
export * from './component-name';

// index.ts
export * from './public-api';
```

## 🔧 TypeScript Standards

### Access Modifiers

- `readonly` for signal inputs/outputs
- `protected readonly` for template-accessed signals
- `private` for internal state and methods
- Always explicit return types for methods

### Signal Patterns

```typescript
// Required input
readonly text = input.required<string>();

// Optional input with default
readonly speed = input<number>(100);

// Output event
readonly completed = output<void>();

// Internal reactive state
private readonly state = signal<State>({ loading: false });

// Template-accessed computed
protected readonly displayText = computed(() => {
  return this.text().toUpperCase();
});
```

## 🎯 SSR Safety

- Use `afterNextRender()` instead of `ngOnInit` for DOM/window access
- Never access `window` or `document` in constructor or ngOnInit
- All browser APIs must be in `afterNextRender()` callback

## 🎨 Styling Guidelines

### CSS Classes

- Use kebab-case: `.component-name`, `.component-name__element`
- BEM methodology for complex components
- Component-scoped styles preferred

### Tailwind Usage

- Utility-first approach
- Custom components with `@apply` when needed
- Responsive design: mobile-first

## 📖 Documentation Requirements

```typescript
/**
 * Brief component description
 */
readonly inputProp = input.required<Type>();

/**
 * Optional input description
 * @defaultValue defaultValue
 */
readonly optionalProp = input<Type>(defaultValue);

/**
 * Event description and when it's emitted
 */
readonly eventName = output<Type>();
```

## 📁 Import Order

1. Angular core imports
2. Angular common imports
3. Third-party libraries
4. Internal library imports (`@queso/...`)
5. Relative imports

```typescript
import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomeLibrary } from 'third-party';

import { UtilService } from '@queso/common';

import { LocalComponent } from './local-component';
```

## 🧪 Testing Approach

- Use Jest for unit tests
- Test signal inputs/outputs
- Mock external dependencies
- Use TestBed for component testing
- File naming: `component-name.spec.ts`

## 📦 Library Development

When creating UI Kit components:

1. Create component in `libs/ui-kit/src/component-name/`
2. Use `qs-` selector prefix
3. Make it fully standalone (no external dependencies)
4. Include proper TypeScript exports
5. Add comprehensive JSDoc documentation
6. Ensure SSR compatibility

## 🚫 What to Avoid

- ❌ `.component` suffix in filenames
- ❌ `ngOnInit` for DOM/window access
- ❌ Direct window/document access outside `afterNextRender`
- ❌ Missing access modifiers on signals
- ❌ Non-readonly signal inputs/outputs
- ❌ Missing JSDoc on public APIs

Follow these patterns consistently to maintain code quality and project conventions.
