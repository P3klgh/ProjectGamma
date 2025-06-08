# Test-Driven Development (TDD) Guide for ProjectGamma

## 🚀 TDD Infrastructure Overview

Your project now has a complete TDD setup with automated testing, CI/CD, and code coverage.

## 📋 Testing Commands

### Frontend (React + Vitest)
```bash
cd frontend

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Type checking
npm run type-check

# Linting
npm run lint
```

### Backend (Node.js + Jest)
```bash
cd backend

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Linting
npm run lint
```

## 🔄 TDD Workflow

### 1. **Red Phase** - Write Failing Tests
```bash
# Write your test first
# Example: src/__tests__/components/NewComponent.test.tsx
npm run test:watch  # See it fail
```

### 2. **Green Phase** - Make Tests Pass
```bash
# Implement minimal code to pass
npm run test:watch  # See it pass
```

### 3. **Refactor Phase** - Improve Code
```bash
# Refactor while keeping tests green
npm run test:watch  # Ensure tests still pass
```

## 📊 CI/CD Pipeline

Your GitHub Actions pipeline runs:

1. **Frontend Tests**
   - ESLint linting
   - TypeScript type checking
   - Vitest unit tests
   - Coverage reports

2. **Backend Tests**
   - ESLint linting
   - Jest unit/integration tests
   - Coverage reports

3. **Security Scanning**
   - Trivy vulnerability scanner

4. **Build & Deploy** (on main branch)
   - Docker image builds
   - Deployment ready

## 🧪 Test Structure

### Frontend Tests
```
frontend/src/
├── __tests__/
│   ├── components/
│   │   └── Navbar.test.tsx
│   ├── hooks/
│   └── utils/
└── test/
    └── setup.ts
```

### Backend Tests
```
backend/src/
├── __tests__/
│   ├── routes/
│   │   ├── auth.test.ts
│   │   └── health.test.ts
│   ├── middleware/
│   └── utils/
└── jest.config.js
```

## 📝 Testing Best Practices

### 1. **Write Descriptive Test Names**
```typescript
// ✅ Good
it('should display error message when login fails with invalid credentials')

// ❌ Bad
it('should handle error')
```

### 2. **Follow AAA Pattern**
```typescript
it('should calculate total price correctly', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }]
  
  // Act
  const total = calculateTotal(items)
  
  // Assert
  expect(total).toBe(30)
})
```

### 3. **Test Edge Cases**
```typescript
describe('User Registration', () => {
  it('should succeed with valid data')
  it('should fail with invalid email')
  it('should fail with short password')
  it('should fail with missing fields')
})
```

### 4. **Mock External Dependencies**
```typescript
// Mock API calls
vi.mock('../services/authService', () => ({
  authService: {
    login: vi.fn()
  }
}))
```

## 🎯 Code Coverage Goals

- **Minimum**: 80% line coverage
- **Target**: 90% line coverage
- **Critical paths**: 100% coverage

## 🔧 Configuration Files

### Frontend
- `vitest.config.ts` - Vitest configuration
- `frontend/src/test/setup.ts` - Test setup
- `tsconfig.json` - TypeScript config with Vitest globals

### Backend
- `jest.config.js` - Jest configuration
- `backend/src/__tests__/tsconfig.json` - TypeScript config for tests

## 🚨 Troubleshooting

### Common Issues

1. **"describe is not defined"**
   - Check TypeScript config includes test types
   - Ensure `"types": ["vitest/globals"]` in frontend
   - Ensure `"types": ["jest"]` in backend test config

2. **Import errors in tests**
   - Check test setup file is loaded
   - Verify mock implementations

3. **CI/CD failures**
   - Check environment variables are set
   - Ensure all dependencies are installed
   - Verify database connection in tests

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest for API Testing](https://github.com/ladjs/supertest)

---

Happy Testing! 🧪✨ 