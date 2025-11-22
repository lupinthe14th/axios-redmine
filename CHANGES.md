# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Updated Node.js version support: now supports 16.x, 18.x, 20.x, and LTS (removed EOL versions 12.x and 14.x)
- Removed hardcoded API keys from example files and README for better security
- Enhanced ESLint rules with stricter code quality checks
- Improved SECURITY.md with GitHub Security Advisories, scope clarification, and no bounty program notice

### Fixed
- Fixed constructor error handling to properly throw errors instead of returning them
- Fixed test suite to properly validate error throwing behavior

### Added
- Added npm scripts: `lint`, `lint:fix`, `coverage`, `serve` for better development workflow

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
