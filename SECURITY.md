# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of axios-redmine seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

**Option 1: GitHub Security Advisories (Recommended)**
1. Go to the [Security tab](https://github.com/lupinthe14th/axios-redmine/security/advisories)
2. Click "Report a vulnerability"
3. Fill in the details using the private reporting feature

**Option 2: Direct Email**
1. **Do NOT** open a public issue
2. Email the maintainer directly at: hideosuzuki@ordinarius-fectum.net
3. Use subject line: "[SECURITY] Vulnerability Report"

### Information to Include

Please provide the following information:
- Type of vulnerability (e.g., XSS, SQL injection, etc.)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability and potential consequences

### What to Expect

- **Initial Response**: You will receive an acknowledgment within 48 hours
- **Status Updates**: We will provide updates on the progress every 5-7 days
- **Disclosure Timeline**: We aim to patch vulnerabilities within 90 days
- **Recognition**: Security researchers will be credited in the release notes and SECURITY.md (unless anonymity is requested)
- **No Bounty Program**: This is a volunteer-maintained open source project and does not offer financial rewards

### Vulnerability Assessment

- **Accepted**: We will work on a fix and coordinate the release
- **Declined**: We will explain why the issue is not considered a vulnerability

### Scope

This security policy covers:
- ✅ Security vulnerabilities in axios-redmine code
- ✅ Critical security issues in dependencies (we'll work to update)
- ❌ Vulnerabilities in Redmine server itself (report to Redmine project)
- ❌ Social engineering or phishing attacks

Thank you for helping keep axios-redmine and its users safe!
