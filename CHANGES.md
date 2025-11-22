# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
- Updated axios from ^0.30.0 to ^1.7.0 to address multiple security vulnerabilities (CVE-2023-45857, CVE-2024-39338)
- Removed codecov package dependency (functionality handled by CI workflow)
- Updated devDependencies to latest versions to address security advisories
  - eslint: ^7.32.0 → ^9.17.0 (migrated to flat config format)
  - mocha: ^9.0.3 → ^10.8.2
  - typescript: ^4.3.5 → ^5.7.2
  - And other dependency updates for security patches

### Added
- Added TypeScript type definitions (index.d.ts) for better TypeScript support
  - Comprehensive definitions for all 68 API methods
  - Practical TypeScript examples with complete workflow demonstrations
  - Export functionality for reusable functions
- Added npm scripts: `lint`, `lint:fix`, `coverage`, `serve` for better development workflow

### Changed
- Updated Node.js version support: now supports 18.x, 20.x, 22.x, and LTS (removed EOL versions 12.x, 14.x, and 16.x)
- Updated GitHub Actions to latest versions (checkout@v4, setup-node@v4, codecov-action@v4)
- Improved CI workflow with explicit permissions and better step naming
- Changed Codecov to non-blocking (fail_ci_if_error: false) and only run on LTS version
- Removed hardcoded API keys from example files and README for better security
- Migrated ESLint configuration from legacy .eslintrc.js to modern flat config format (eslint.config.js)
- Enhanced ESLint rules with stricter code quality checks (with Mocha-compatible overrides for test files)
- Improved SECURITY.md with GitHub Security Advisories, scope clarification, and no bounty program notice

### Fixed
- Fixed constructor error handling to properly throw errors instead of returning them
- Fixed test suite to properly validate error throwing behavior

### Removed
- Removed Greenkeeper badge from README (project now uses Renovate)
- Removed unused commented code in lib/redmine.js
- Removed unnecessary `"private": false` from package.json

## [0.1.49] - 2025-11-22

### Changed
- Updated dependency axios to v0.30.2

## [0.1.0] - Initial Release

### Added
- Initialize node-redmine

[Unreleased]: https://github.com/lupinthe14th/axios-redmine/compare/v0.1.49...HEAD
[0.1.49]: https://github.com/lupinthe14th/axios-redmine/releases/tag/v0.1.49
[0.1.0]: https://github.com/lupinthe14th/axios-redmine/releases/tag/v0.1.0
