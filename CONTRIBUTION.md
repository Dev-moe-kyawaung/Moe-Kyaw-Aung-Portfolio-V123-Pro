# Contributing to Moe Kyaw Aung Portfolio V0123

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 Code of Conduct

Please review and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 🚀 Getting Started

### Prerequisites
- Git knowledge
- Node.js 16.x or higher
- npm or yarn
- React.js understanding

### Setup Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Moe-Kyaw-Aung-Portfolio-V0123.git

# Add upstream remote
git remote add upstream https://github.com/Dev-moe-kyawaung/Moe-Kyaw-Aung-Portfolio-V0123.git

# Create feature branch
git checkout -b feature/your-feature-name

# Install dependencies
npm install

# Start development server
npm start
```

## 📋 Contributing Process

### 1. Before You Start

- Check existing [Issues](https://github.com/Dev-moe-kyawaung/Moe-Kyaw-Aung-Portfolio-V0123/issues)
- Check open [Pull Requests](https://github.com/Dev-moe-kyawaung/Moe-Kyaw-Aung-Portfolio-V0123/pulls)
- Discuss major changes in an issue first

### 2. Making Changes

```bash
# Create feature branch
git checkout -b feature/descriptive-name

# Make your changes following code style
# Test thoroughly

# Stage changes
git add .

# Commit with clear message (see Commit Guidelines below)
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/descriptive-name
```

### 3. Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)
footer (optional)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Test additions
- `chore:` Build/dependency changes

**Examples:**
```
feat(hero): add particle animation to hero section
fix(nav): resolve mobile menu toggle issue
docs(readme): update installation instructions
style(colors): update color variables
```

### 4. Pull Request

1. **Push to GitHub:**
   ```bash
   git push origin feature/descriptive-name
   ```

2. **Create Pull Request:**
   - Use the PR template
   - Clear title and description
   - Link related issues
   - Screenshots/videos if UI changes

3. **PR Template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Related Issue
   Fixes #(issue number)

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation

   ## Testing
   How to test changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   ```

## 🎨 Code Style

### JavaScript/React

```javascript
// ✅ GOOD
const Component = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  const handleClick = useCallback(() => {
    // logic
  }, []);

  return (
    <div className="component">
      {/* content */}
    </div>
  );
};

// ❌ AVOID
const Component = (props) => {
  let state = null;
  function handleClick() { }
  return <div>...</div>;
};
```

### Naming Conventions

- **Components:** PascalCase (`HeroSection.jsx`)
- **Files:** kebab-case (`hero-section.jsx`)
- **Functions:** camelCase (`handleClick`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_COLOR`)
- **CSS Classes:** kebab-case (`.hero-section`)

### CSS/Styling

```css
/* ✅ Use CSS variables */
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}

/* ❌ Avoid magic numbers */
.component {
  color: #00d9ff;
  padding: 15px;
}
```

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Guidelines
- Write tests for new features
- Test edge cases
- Maintain >80% coverage
- Use descriptive test names

```javascript
// ✅ GOOD
describe('HeroSection', () => {
  it('should render hero title', () => {
    render(<HeroSection />);
    expect(screen.getByText('MŒKYAW AUNG')).toBeInTheDocument();
  });
});

// ❌ AVOID
describe('HeroSection', () => {
  it('works', () => {
    // test
  });
});
```

## 📝 Documentation

### File Documentation
```javascript
/**
 * HeroSection Component
 * 
 * Displays the main hero section with particle animation,
 * title, and call-to-action buttons.
 * 
 * @component
 * @example
 * return <HeroSection />
 * 
 * @returns {React.ReactElement}
 */
export const HeroSection = () => {
  // ...
};
```

### README Updates
Update README.md if you:
- Add new features
- Change configuration
- Add new sections
- Update dependencies

## 🐛 Bug Reports

Use GitHub Issues with template:

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Node: 18.x

## Screenshots/Videos
(if applicable)
```

## 💡 Feature Requests

Use GitHub Issues:

```markdown
## Description
Clear description of feature

## Use Case
Why this feature is needed

## Proposed Solution
How it should work

## Alternatives
Other solutions considered

## Additional Context
Screenshots, mockups, etc.
```

## 📚 Documentation Contributions

### Updating Docs
- Keep language simple and clear
- Add code examples
- Update table of contents
- Check grammar and spelling

### Docstring Format
```javascript
/**
 * Fetches user data from API
 * 
 * @async
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} User data object
 * @throws {Error} If API request fails
 */
const fetchUser = async (userId) => {
  // ...
};
```

## 🔄 Review Process

1. **Automated Checks:**
   - ESLint
   - Tests pass
   - Build succeeds

2. **Manual Review:**
   - Code quality
   - Design consistency
   - Documentation
   - Performance impact

3. **Approval:**
   - Minimum 1 approval
   - All checks pass
   - Conflicts resolved

4. **Merge:**
   - Squash commits
   - Delete branch
   - Update CHANGELOG

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Web Accessibility](https://www.w3.org/WAI/)

## 🙋 Getting Help

- **Questions:** Open a Discussion
- **Issues:** Check existing issues
- **Email:** moekyawaung@programmer.net
- **Discord:** (coming soon)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🎉 Recognition

Contributors are recognized in:
- README.md
- Release notes
- GitHub contributors page

---

**Thank you for contributing! Your efforts help make this project better for everyone.** ⚡

For questions, contact [moekyawaung@programmer.net](mailto:moekyawaung@programmer.net)
