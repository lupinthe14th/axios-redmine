# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Updated configuration files:
  - Fixed typo in .editorconfig comment ("dirrerent" → "different")
  - Added Markdown-specific rule to .editorconfig (preserve trailing whitespace)
  - Updated .npmignore to reference eslint.config.js instead of .eslintrc.js
  - Removed obsolete .travis.yml reference from .npmignore
  - Added editor directories (.vscode, .idea) to .npmignore and .gitignore
  - Enhanced .gitignore with Docker Compose and additional environment file patterns

## [0.1.54] - 2025-11-22

### Changed
- Updated publish workflow (.github/workflows/publish.yml):
  - Updated checkout action from v3 to v4
  - Updated setup-node action from v3 to v4
  - Added explicit check for merged PRs only
  - Improved step naming and added explicit shell specifications
  - Added --frozen-lockfile flag to yarn install
  - Added --non-interactive flag to yarn publish
  - Added cache: yarn to setup-node for faster builds
  - Pinned action versions instead of using @master/@latest (security best practice):
    - phips28/gh-action-bump-version@v11.0.3 (was @master)
    - marvinpinto/action-automatic-releases@v1.2.1 (was @latest)
  - Changed checkout ref to fetch-depth: 0 for full git history
- Fixed actionlint and yamllint warnings:
  - Removed unnecessary `${{ }}` from if conditions in ci.yml
  - Changed `branches: - '!master'` to `branches-ignore:` in reviewdog.yml
  - Changed `secrets.github_token` to `secrets.GITHUB_TOKEN` (uppercase) in reviewdog.yml
  - Removed trailing blank lines from workflow files

## [0.1.53] - 2025-11-22

### Security
- Updated axios from ^0.30.0 to ^1.7.0 to address multiple security vulnerabilities (CVE-2023-45857, CVE-2024-39338)
- Removed codecov package dependency (functionality handled by CI workflow)
- Updated devDependencies to latest versions to address security advisories
  - eslint: ^7.32.0 → ^9.17.0 (migrated to flat config format)
  - mocha: ^9.0.3 → ^10.8.2
  - typescript: ^4.3.5 → ^5.7.2
  - And other dependency updates for security patches

### Added
- Added CONTRIBUTING.md with comprehensive contribution guidelines
- Added pull request template (.github/pull_request_template.md)
- Added TypeScript type definitions (index.d.ts) for better TypeScript support
  - Comprehensive definitions for all 68 API methods
  - Practical TypeScript examples with complete workflow demonstrations
  - Export functionality for reusable functions
- Added npm scripts: `lint`, `lint:fix`, `coverage`, `serve` for better development workflow
- Added additional CI quality checks:
  - ESLint check on LTS Node.js version
  - npm security audit (moderate level, non-blocking)
- Added more badges to README:
  - npm version badge
  - Node.js version requirement badge
  - License badge
- Added "Features" section to README highlighting key capabilities
- Added "Requirements" section to README documenting Node.js >= 20.0.0

### Changed
- **BREAKING**: Dropped Node.js 18.x support (EOL April 2025). Minimum version is now Node.js 20.0.0
- Updated Node.js version support: now supports 20.x, 22.x, and LTS (removed EOL versions 12.x, 14.x, 16.x, and 18.x)
- Added engines field to package.json to enforce minimum Node.js version
- Updated GitHub Actions to latest versions (checkout@v4, setup-node@v4, codecov-action@v4)
- Improved CI workflow with explicit permissions and better step naming
- Changed Codecov to non-blocking (fail_ci_if_error: false) and only run on LTS version
- Removed hardcoded API keys from example files and README for better security
- Migrated ESLint configuration from legacy .eslintrc.js to modern flat config format (eslint.config.js)
- Enhanced ESLint rules with stricter code quality checks (with Mocha-compatible overrides for test files)
- Improved SECURITY.md with GitHub Security Advisories, scope clarification, and no bounty program notice
- Improved README.md structure and formatting
  - Better organized sections
  - Added emoji icons for visual clarity
  - Clearer feature highlights
  - More professional presentation
- Updated GitHub Actions workflows to latest versions:
  - reviewdog.yml: Updated checkout action from v3 to v4
  - codeql-analysis.yml: Updated checkout from v2 to v4, CodeQL actions from v1 to v3
  - Improved workflow formatting and consistency

### Fixed
- Fixed constructor error handling to properly throw errors instead of returning them
- Fixed test suite to properly validate error throwing behavior

### Removed
- Removed Greenkeeper badge from README
- Removed unused commented code in lib/redmine.js
- Removed unnecessary `"private": false` from package.json

## [0.1.49] - 2025-11-22

### Changed
- Updated dependency axios to v0.30.2

## [0.1.0] - Initial Release

### Added
- Initialize node-redmine

[Unreleased]: https://github.com/lupinthe14th/axios-redmine/compare/v0.1.54...HEAD
[0.1.54]: https://github.com/lupinthe14th/axios-redmine/compare/v0.1.53...v0.1.54
[0.1.53]: https://github.com/lupinthe14th/axios-redmine/compare/v0.1.49...v0.1.53
[0.1.49]: https://github.com/lupinthe14th/axios-redmine/releases/tag/v0.1.49
[0.1.0]: https://github.com/lupinthe14th/axios-redmine/releases/tag/v0.1.0
