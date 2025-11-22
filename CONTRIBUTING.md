# Contributing to axios-redmine

Thank you for your interest in contributing to axios-redmine! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions with the project community.

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **yarn** (recommended) or npm
- A Redmine instance for testing (optional but recommended)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/axios-redmine.git
   cd axios-redmine
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Run tests to ensure everything works:
   ```bash
   yarn test
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn coverage
```

### Linting

```bash
# Check for lint errors
yarn lint

# Auto-fix lint errors
yarn lint:fix
```

### Before Submitting

1. **Run tests**: Ensure all tests pass
2. **Run linter**: Fix any linting errors
3. **Update documentation**: If you're adding features or changing behavior
4. **Write tests**: For new features or bug fixes
5. **Update CHANGES.md**: Add an entry under `[Unreleased]`

## Pull Request Process

1. **Create a feature branch** from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style

3. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "feat: add support for custom fields API"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `test:` Test additions or changes
   - `refactor:` Code refactoring
   - `chore:` Maintenance tasks

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests for new functionality
- Update documentation as needed
- Ensure CI passes
- Link related issues

## Reporting Bugs

Please use GitHub Issues to report bugs. Include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Minimal code example
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Node.js version, OS, Redmine version
- **Additional context**: Stack traces, screenshots, etc.

## Suggesting Features

Feature requests are welcome! Please:

1. Check if the feature is already requested
2. Clearly describe the use case
3. Explain why it would be useful
4. Consider if it fits the project scope

## Security Vulnerabilities

Please report security vulnerabilities privately. See [SECURITY.md](SECURITY.md) for details.

## Code Style

- Follow existing code style
- Use ESLint (configured in project)
- Write clear, self-documenting code
- Add comments for complex logic
- Use meaningful variable and function names

## Testing

- Write tests for new features and bug fixes
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

## Questions?

Feel free to open an issue for questions or clarifications.

## License

By contributing, you agree that your contributions will be licensed under the GPL-3.0 License.
