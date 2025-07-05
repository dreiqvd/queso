# Styling Guidelines

## CSS/SCSS Conventions

### File Structure

- Global styles: `apps/*/src/styles.scss`
- Component styles: Inline in component decorator or external `.scss` file
- Shared styles: `libs/shared/assets/styles/`

### Naming Conventions

- Use kebab-case for CSS classes: `.my-component-class`
- Use BEM methodology for complex components:
  - Block: `.card`
  - Element: `.card__header`
  - Modifier: `.card--highlighted`

### CSS Architecture

```scss
// Component styles structure
.component-name {
  // Base styles
  display: block;

  // Element styles
  &__element {
    // Element-specific styles
  }

  // Modifier styles
  &--modifier {
    // Modifier-specific styles
  }

  // State styles
  &:hover,
  &:focus {
    // Interactive states
  }

  // Responsive styles
  @media (min-width: 768px) {
    // Tablet and up
  }

  @media (min-width: 1024px) {
    // Desktop and up
  }
}
```

## Tailwind CSS Usage

### Classes Order

1. Layout (display, position, grid, flex)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (font, text)
5. Colors (background, text, border)
6. Effects (shadow, opacity, transform)

### Custom Components

- Use `@apply` directive for reusable component classes
- Prefer utility classes in templates when possible
- Create custom utilities in global styles when needed

```scss
// Custom component utility
.btn {
  @apply px-4 py-2 rounded font-medium transition-colors;

  &--primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }

  &--secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
}
```

## Animations and Transitions

### CSS Animations

```scss
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
```

### Transitions

- Use consistent timing functions: `ease-in-out`, `ease-out`
- Standard durations: `150ms`, `300ms`, `500ms`
- Always specify properties to transition

```scss
.interactive-element {
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
```

## Responsive Design

### Breakpoints (Tailwind defaults)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

```scss
.responsive-component {
  // Mobile styles (default)
  padding: 1rem;

  // Tablet and up
  @media (min-width: 768px) {
    padding: 2rem;
  }

  // Desktop and up
  @media (min-width: 1024px) {
    padding: 3rem;
  }
}
```

## CSS Custom Properties (Variables)

### Theme Variables

```scss
:root {
  // Colors
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-error: #ef4444;

  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  // Typography
  --font-family-sans: 'Inter', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

## Accessibility

### Focus States

- Always provide visible focus indicators
- Use consistent focus ring styles
- Ensure sufficient color contrast

```scss
.focusable-element {
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

### Color Contrast

- Ensure WCAG AA compliance (4.5:1 for normal text)
- Use tools to verify contrast ratios
- Provide alternative visual cues beyond color

## Performance

### CSS Optimization

- Avoid deep nesting (max 3-4 levels)
- Use efficient selectors
- Minimize unused CSS
- Leverage CSS containment when appropriate

```scss
// Good - specific and efficient
.card__title {
  font-size: 1.25rem;
  font-weight: 600;
}

// Avoid - overly nested
.page .section .card .header .title {
  font-size: 1.25rem;
}
```

## Component-Specific Styling

### Inline Styles

```typescript
@Component({
  styles: [`
    :host {
      display: block;
    }

    .component-content {
      /* Component-specific styles */
    }
  `]
})
```

### External Stylesheets

```typescript
@Component({
  styleUrl: './component.scss'
})
```

Use external stylesheets for:

- Complex styling
- Large components
- Reusable style patterns
