# Testing Conventions and Patterns

## Testing Framework and Tools

### Primary Testing Stack

- **Unit Tests**: Jest with Angular Testing Utilities
- **Component Tests**: Angular TestBed with shallow rendering
- **Integration Tests**: Jest with real service interactions
- **E2E Tests**: Cypress or Playwright (when needed)

### Test File Organization

```
component-name/
├── component-name.ts
├── component-name.spec.ts    # Unit tests
├── component-name.integration.spec.ts  # Integration tests
└── component-name.e2e.spec.ts  # E2E tests (if needed)
```

## Unit Testing Patterns

### Component Testing Template

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentNameComponent } from './component-name';

describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNameComponent], // Standalone component
      // providers: [], // Add service mocks if needed
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept required text input', () => {
      fixture.componentRef.setInput('text', 'Test text');
      expect(component.text()).toBe('Test text');
    });

    it('should use default value for optional inputs', () => {
      expect(component.typingSpeed()).toBe(100);
    });
  });

  describe('Output Events', () => {
    it('should emit completion event when animation finishes', (done) => {
      fixture.componentRef.setInput('text', 'Hi');

      component.typingComplete.subscribe(() => {
        expect(true).toBe(true); // Animation completed
        done();
      });

      fixture.detectChanges();
    });
  });

  describe('Template Rendering', () => {
    it('should display typed text', () => {
      fixture.componentRef.setInput('text', 'Hello');
      fixture.detectChanges();

      // Wait for animation or use fakeAsync
      const element = fixture.nativeElement.querySelector('.typewriter');
      expect(element).toBeTruthy();
    });
  });
});
```

### Service Testing Template

```typescript
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserById', () => {
    it('should return user data', () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      };

      service.getUserById('1').subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('/api/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should handle error responses', () => {
      service.getUserById('999').subscribe({
        next: () => fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne('/api/users/999');
      req.flush('User not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
```

## Signal Testing Patterns

### Testing Signal Components

```typescript
describe('Signal Component', () => {
  it('should update signal values', () => {
    const component = new SignalComponent();

    // Test signal initialization
    expect(component.count()).toBe(0);

    // Test signal updates
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('should test computed signals', () => {
    const component = new SignalComponent();

    TestBed.runInInjectionContext(() => {
      // Test computed signal behavior
      component.setCount(5);
      expect(component.doubleCount()).toBe(10);
    });
  });
});
```

## Mock Patterns

### Service Mocking

```typescript
// Create mock service
const mockUserService = {
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
} as jest.Mocked<UserService>;

// In beforeEach
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [{ provide: UserService, useValue: mockUserService }],
  });
});

// In tests
it('should call user service', () => {
  mockUserService.getUserById.mockReturnValue(of(mockUser));

  component.loadUser('123');

  expect(mockUserService.getUserById).toHaveBeenCalledWith('123');
});
```

### HTTP Client Mocking

```typescript
// Use HttpClientTestingModule for HTTP testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  });
});
```

## Async Testing

### Testing Observables

```typescript
import { of, throwError } from 'rxjs';

it('should handle async operations', (done) => {
  service.getData().subscribe({
    next: (data) => {
      expect(data).toBeDefined();
      done();
    },
    error: done.fail,
  });
});

// Or using async/await
it('should handle async operations with async/await', async () => {
  const data = await service.getData().toPromise();
  expect(data).toBeDefined();
});
```

### Testing Promises

```typescript
it('should handle promise-based operations', async () => {
  const result = await service.processData(inputData);
  expect(result).toEqual(expectedResult);
});
```

### FakeAsync Testing

```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should handle timers', fakeAsync(() => {
  component.startTimer();

  tick(1000); // Advance time by 1 second

  expect(component.timerValue()).toBe(1);
}));
```

## Integration Testing

### Component Integration Tests

```typescript
describe('Component Integration', () => {
  let component: ParentComponent;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentComponent, ChildComponent, HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();

    userService = TestBed.inject(UserService);
  });

  it('should integrate with child components', () => {
    // Test parent-child component interactions
    component.selectUser('123');

    const childComponent = fixture.debugElement.query(
      By.directive(ChildComponent)
    ).componentInstance;

    expect(childComponent.userId()).toBe('123');
  });
});
```

## Test Utilities and Helpers

### Custom Test Utilities

```typescript
// test-utils.ts
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    ...overrides,
  };
}

export function expectElementToHaveText(
  fixture: ComponentFixture<any>,
  selector: string,
  expectedText: string
): void {
  const element = fixture.nativeElement.querySelector(selector);
  expect(element?.textContent?.trim()).toBe(expectedText);
}
```

### Page Object Model (for E2E-style component tests)

```typescript
class ComponentPageObject {
  constructor(private fixture: ComponentFixture<any>) {}

  get submitButton() {
    return this.fixture.nativeElement.querySelector('[data-testid="submit"]');
  }

  get errorMessage() {
    return this.fixture.nativeElement.querySelector('.error-message');
  }

  fillForm(data: FormData) {
    // Helper method to fill form fields
  }

  clickSubmit() {
    this.submitButton.click();
    this.fixture.detectChanges();
  }
}
```

## Test Data Management

### Test Fixtures

```typescript
// test-fixtures.ts
export const TEST_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export const MOCK_API_RESPONSE = {
  data: TEST_USERS,
  meta: { total: 2, page: 1 },
};
```

## Coverage and Quality

### Coverage Targets

- **Unit Tests**: Aim for 80%+ code coverage
- **Component Tests**: Test all public methods and properties
- **Integration Tests**: Test critical user flows

### Test Quality Guidelines

- **Arrange, Act, Assert**: Structure tests clearly
- **Single Responsibility**: One assertion per test when possible
- **Descriptive Names**: Test names should describe expected behavior
- **Independent Tests**: Tests shouldn't depend on each other

### Example Test Structure

```typescript
describe('Feature: User Management', () => {
  describe('When loading user data', () => {
    describe('Given valid user ID', () => {
      it('should return user information', () => {
        // Arrange
        const userId = '123';
        const expectedUser = createMockUser({ id: userId });

        // Act
        const result = service.getUserById(userId);

        // Assert
        expect(result).toEqual(expectedUser);
      });
    });
  });
});
```
