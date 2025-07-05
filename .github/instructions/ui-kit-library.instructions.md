# UI Kit Library Guidelines

## Library Structure

```
libs/ui-kit/src/
├── component-name/
│   ├── component-name.ts
│   ├── index.ts
│   └── public-api.ts
└── index.ts
```

## Component Requirements

### Naming Convention

- Directory: `kebab-case` (e.g., `typewriter`, `date-picker`)
- Component file: `component-name.ts` (no `.component` suffix)
- Class: `PascalCase + Component` (e.g., `TypewriterComponent`)
- Selector: `qs-component-name` (using `qs` prefix)

### File Structure

1. **Main component file**: `component-name.ts`
2. **Public API**: `public-api.ts` - exports the component
3. **Index file**: `index.ts` - re-exports from public-api

### Component Template

```typescript
import { Component, input, output, signal, OnDestroy } from '@angular/core';

@Component({
  selector: 'qs-component-name',
  imports: [],
  template: '<div class="component-name">Content</div>',
  styles: [
    `
      .component-name {
        /* Component styles */
      }
    `,
  ],
})
export class ComponentNameComponent implements OnDestroy {
  /**
   * Description of the input
   */
  readonly inputName = input.required<Type>();

  /**
   * Optional input with default
   * @defaultValue defaultValue
   */
  readonly optionalInput = input<Type>(defaultValue);

  /**
   * Description of output event
   */
  readonly eventName = output<Type>();

  // Protected signals for template access
  protected readonly templateState = signal<Type>(initial);

  // Private state and cleanup
  private cleanup?: () => void;

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
```

## SSR Considerations

- Use `afterNextRender()` for browser-only code
- Avoid direct `window` or `document` access in constructor/ngOnInit
- Handle cleanup properly in `ngOnDestroy`

## Styling Guidelines

- Use component-scoped styles
- Follow BEM methodology for CSS classes
- Use CSS custom properties for theming
- Ensure responsive design

## Export Pattern

### public-api.ts

```typescript
export * from './component-name';
```

### index.ts

```typescript
export * from './public-api';
```

## Usage Import Pattern

```typescript
import { ComponentNameComponent } from '@queso/ui-kit/component-name';
```

## Testing

- Each component should have unit tests
- Test signal inputs and outputs
- Test component lifecycle and cleanup
- Mock browser APIs for SSR compatibility

## Documentation

- Comprehensive JSDoc for all public APIs
- Include usage examples in comments
- Document accessibility features
- Explain any complex behavior or edge cases
