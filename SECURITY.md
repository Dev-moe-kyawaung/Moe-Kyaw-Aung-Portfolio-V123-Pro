# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in the Moe Kyaw Aung Portfolio project, please email us immediately instead of using the public issue tracker.

**Email:** security@moekyawaung.dev or moekyawaung@programmer.net
**Subject Line:** [SECURITY] Vulnerability Report

Please include:
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will acknowledge receipt of your report within 48 hours and provide an estimated timeline for a fix.

## Security Guidelines

### Do NOT
- Disclose vulnerabilities publicly before we've had time to fix them
- Post the vulnerability on social media
- Share vulnerability details with third parties
- Use the public issue tracker for security issues

### Do
- Email security reports privately
- Provide as much detail as possible
- Give us reasonable time to fix before disclosure
- Coordinate with us on public disclosure timeline

## Supported Versions

| Version | Supported | Notes |
|---------|-----------|-------|
| 0.1.23+ | ✅ Yes | Current stable release |
| 0.1.20 - 0.1.22 | ⚠️ Partial | Security fixes only |
| < 0.1.20 | ❌ No | Please upgrade |

## Security Best Practices

### For Users
1. **Keep dependencies updated:** Run `npm update` regularly
2. **Use environment variables:** Never hardcode sensitive data
3. **HTTPS only:** Always use HTTPS in production
4. **Update Node.js:** Use latest LTS version
5. **Regular backups:** Backup your configuration

### For Developers
1. **Code review:** All changes must be reviewed
2. **Dependency audit:** `npm audit` before deployment
3. **No secrets in code:** Use environment variables
4. **Input validation:** Validate all user input
5. **CORS headers:** Properly configure CORS
6. **CSP headers:** Implement Content Security Policy
7. **Regular updates:** Keep dependencies current

## Dependency Management

### Checking for Vulnerabilities
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Get detailed report
npm audit --detailed
```

### Updating Dependencies
```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update to latest versions
npm install -g npm-check-updates
ncu -u && npm install
```

## Environment Variables

### Never commit:
- API keys
- Database passwords
- OAuth tokens
- Private keys
- Credentials

### Use .env file:
```
.env (local - never commit)
.env.example (template - commit this)
.env.production (production config)
```

### Secure storage:
- Use GitHub Secrets for CI/CD
- Use .env.local for local development
- Use environment-specific configs

## HTTP Headers

### Recommended Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

## HTTPS & SSL/TLS

- Always use HTTPS in production
- Use TLS 1.2 or higher
- Use valid SSL certificates
- Keep certificates updated

## Input Validation

### Examples
```javascript
// ✅ GOOD - Validate input
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ❌ BAD - No validation
const email = userInput; // dangerous!
```

## Output Encoding

```javascript
// ✅ GOOD - Encode output
const safeHTML = DOMPurify.sanitize(userInput);

// ❌ BAD - Direct output
document.innerHTML = userInput; // dangerous!
```

## Regular Security Audits

We perform:
- Weekly dependency audits
- Monthly security reviews
- Quarterly penetration testing
- Annual third-party security assessments

## Incident Response

If a vulnerability is discovered:

1. **Assessment** (24 hours)
   - Confirm the vulnerability
   - Assess impact and severity
   - Identify affected versions

2. **Fix Development** (varies)
   - Create fix
   - Test thoroughly
   - Code review

3. **Release** (varies)
   - Release patch version
   - Update documentation
   - Publish security advisory

4. **Disclosure** (90 days max)
   - Public announcement
   - Credit to reporter (if approved)
   - Update security guidelines

## Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. With permission, we will credit you in our security advisories.

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NPM Security Best Practices](https://docs.npmjs.com/policies/security)
- [React Security](https://react.dev/learn/security)

---

**Last Updated:** June 2024
**Maintainer:** Moe Kyaw Aung
**License:** MIT

For questions: moekyawaung@programmer.net
