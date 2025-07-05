# Angular Component Generation Guidelines

## Component Naming and Structure

### File Naming

- Remove `.component` suffix from filenames (Angular 20+ practice)
- Use kebab-case for file names: `my-component.ts`
- Template files: `my-component.html` (if external)
- Style files: `my-component.scss` (if external)

### Component Class Structure

```typescript
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'prefix-component-name',
  imports: [...],
  template: '...' || templateUrl: './component.html',
  styles: [...] || styleUrl: './component.scss'
})
export class ComponentNameComponent {
  // Signal inputs (readonly)
  readonly inputProperty = input.required<Type>();
  readonly optionalInput = input<Type>(defaultValue);

  // Signal outputs
  readonly eventName = output<Type>();

  // Protected signals for template access
  protected readonly templateData = signal<Type>(initialValue);

  // Private properties
  private internalState = signal<Type>(initialValue);
}
```

## Component Conventions

### Selectors

- Use project prefix: `qs-` for UI Kit components
- Use `app-` for application-specific components
- Use kebab-case: `qs-my-component`

### Access Modifiers

- Signal inputs: `readonly`
- Signal outputs: `readonly`
- Template-accessed properties: `protected readonly`
- Internal state: `private`
- Methods accessed in template: `protected`
- Internal methods: `private`

### Signal Usage

- Prefer signals over traditional properties
- Use `input()` and `input.required()` for component inputs
- Use `output()` for component events
- Use `signal()` for internal reactive state

### Lifecycle Hooks

- Use `afterNextRender()` for DOM-dependent operations (SSR safe)
- Use `OnDestroy` for cleanup
- Prefer constructor injection over `OnInit` when possible

### Template Guidelines

- Use single quotes for template strings
- Self-closing tags for empty elements: `<component />`
- Bind to signals with `()`: `{{ mySignal() }}`

## Documentation

- Use JSDoc comments for all public inputs/outputs
- Include `@defaultValue` for optional inputs
- Document emitted events and their payload types

## Example Component

```typescript
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'qs-example',
  template: '<div>{{ displayText() }}</div>',
  styles: ['div { color: blue; }'],
})
export class ExampleComponent {
  /**
   * The text to display
   */
  readonly text = input.required<string>();

  /**
   * Whether the component is disabled
   * @defaultValue false
   */
  readonly disabled = input<boolean>(false);

  /**
   * Emitted when text is clicked
   */
  readonly textClicked = output<string>();

  protected readonly displayText = signal('');
}
```
