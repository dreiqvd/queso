# TypeScript Coding Standards

## General Principles

### Type Safety

- Always use explicit types for function parameters and return values
- Prefer `unknown` over `any`
- Use type assertions sparingly and with type guards
- Enable strict TypeScript configuration

### Modern TypeScript Features

- Use template literal types for string unions
- Leverage conditional types for complex type logic
- Use `satisfies` operator for type checking without widening
- Prefer `const` assertions for immutable data

## Function and Method Conventions

### Function Signatures

```typescript
// Good - explicit types
function processData(input: UserInput): Promise<ProcessedData> {
  // implementation
}

// Good - arrow function with explicit return type
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Good - void return type for side effects
private updateUI(): void {
  // UI update logic
}
```

### Access Modifiers

- `public` - Default, accessible everywhere (usually omitted)
- `protected` - Accessible in class and subclasses, template access
- `private` - Only accessible within the class
- `readonly` - Cannot be reassigned after initialization

```typescript
class ExampleService {
  // Public (default) - external API
  getData(): Observable<Data> {}

  // Protected - subclass and template access
  protected formatData(data: RawData): FormattedData {}

  // Private - internal implementation
  private validateInput(input: unknown): boolean {}

  // Readonly - immutable after construction
  private readonly config: Config;
}
```

## Interface and Type Definitions

### Interface Naming

- Use PascalCase
- Descriptive names without prefixes
- Use generic constraints when needed

```typescript
// Good - clear interface definition
interface UserProfile {
  readonly id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

// Good - generic interface with constraints
interface Repository<T extends Entity> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
```

### Type Unions and Literals

```typescript
// Good - discriminated union
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: string };

// Good - template literal types
type EventName = `on${Capitalize<string>}`;
type ThemeColor = 'primary' | 'secondary' | 'success' | 'error';
```

## Error Handling

### Type-Safe Error Handling

```typescript
// Good - explicit error types
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Good - result type pattern
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

async function safeApiCall<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
```

## Generic Constraints and Utilities

### Generic Constraints

```typescript
// Good - constrained generics
interface Identifiable {
  id: string;
}

function updateEntity<T extends Identifiable>(
  entity: T,
  updates: Partial<Omit<T, 'id'>>
): T {
  return { ...entity, ...updates };
}
```

### Utility Types

```typescript
// Good - using built-in utility types
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateUserRequest = Partial<Pick<User, 'name' | 'email'>>;
type UserKeys = keyof User;

// Good - custom utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredFields<T> = {
  [K in keyof T]-?: T[K];
};
```

## Async/Await and Promises

### Async Function Patterns

```typescript
// Good - explicit Promise return type
async function fetchUserData(id: string): Promise<UserData> {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
}

// Good - error handling in async functions
async function safeDataFetch(id: string): Promise<UserData | null> {
  try {
    return await fetchUserData(id);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}
```

## Angular-Specific TypeScript

### Signals and Reactivity

```typescript
// Good - typed signals
readonly user = signal<User | null>(null);
readonly isLoading = signal<boolean>(false);
readonly users = signal<readonly User[]>([]);

// Good - computed signals with explicit types
readonly userDisplayName = computed((): string => {
  const user = this.user();
  return user ? `${user.firstName} ${user.lastName}` : 'Anonymous';
});
```

### Dependency Injection

```typescript
// Good - explicit injection with types
constructor(
  private readonly userService: UserService,
  private readonly router: Router,
  @Inject(CONFIG_TOKEN) private readonly config: AppConfig
) {}

// Good - inject function usage
private readonly httpClient = inject(HttpClient);
private readonly destroyRef = inject(DestroyRef);
```

## Code Organization

### Import Statements

```typescript
// 1. Angular imports
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// 2. Third-party imports
import { Observable, map, filter } from 'rxjs';

// 3. Internal library imports
import { UserService } from '@queso/common';

// 4. Relative imports
import { UserProfileComponent } from './user-profile.component';
import { User } from '../models/user.model';
```

### Export Patterns

```typescript
// Good - named exports for better tree-shaking
export { UserService } from './user.service';
export { User, UserProfile } from './user.model';
export type { UserRepository } from './user.repository';

// Good - barrel exports in index.ts
export * from './services';
export * from './models';
export * from './components';
```

## Documentation

### JSDoc Standards

````typescript
/**
 * Retrieves user data by ID with caching support.
 *
 * @param id - The unique identifier for the user
 * @param useCache - Whether to use cached data if available
 * @returns Promise that resolves to user data or null if not found
 * @throws {ValidationError} When the ID format is invalid
 * @throws {NetworkError} When the API request fails
 *
 * @example
 * ```typescript
 * const user = await getUserById('123', true);
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
async function getUserById(id: string, useCache = false): Promise<User | null> {
  // implementation
}
````
