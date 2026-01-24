# Contributing to 3D Panoramic Tour

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/3D-tour.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Make your changes
2. Test your changes: `npm run dev`
3. Build to ensure no errors: `npm run build`
4. Commit your changes with a clear message
5. Push to your fork
6. Open a Pull Request

## Code Style

- Use ES6+ JavaScript features
- Follow existing code formatting
- Add comments for complex logic
- Keep functions focused and single-purpose
- Use descriptive variable names

## Adding Features

When adding new features:

1. **Update documentation**: Add to README.md or SETUP.md
2. **Consider performance**: Test with large panoramas
3. **Mobile compatibility**: Test on mobile devices
4. **Browser support**: Ensure cross-browser compatibility
5. **Examples**: Provide usage examples if applicable

## Bug Reports

Good bug reports should include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Console errors (if any)
- Screenshots (if relevant)

## Feature Requests

Feature requests should include:

- Clear description of the feature
- Use case explanation
- Expected behavior
- Potential implementation approach (optional)

## Areas for Contribution

We welcome contributions in these areas:

### Features
- VR/AR support (WebXR)
- Audio narration
- Mini-map navigation
- Scene transitions/animations
- Info points with text/images
- Tour analytics
- Keyboard navigation
- Accessibility improvements

### Improvements
- Performance optimizations
- Better mobile controls
- Loading indicators
- Error handling
- Image compression utilities
- Configuration validation
- Unit tests

### Documentation
- Tutorials
- Video guides
- More examples
- API documentation
- Troubleshooting guides
- Translations

### Tools
- Panorama converter utilities
- Hotspot positioning helper
- Configuration generator
- Image optimizer
- Scene map generator

## Code Review Process

1. All submissions require review
2. Maintainers will review PRs within a week
3. Address feedback and requested changes
4. Once approved, maintainers will merge

## Testing

Before submitting:

- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Test with different panorama sizes
- [ ] Verify no console errors
- [ ] Check performance (smooth 60fps navigation)
- [ ] Verify hotspots work correctly
- [ ] Test fullscreen mode
- [ ] Check responsive design

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add VR mode support`
- `fix: correct hotspot positioning bug`
- `docs: update setup instructions`
- `style: improve button hover effects`
- `refactor: simplify camera controls`
- `perf: optimize texture loading`

## Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style
- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] Documentation updated
- [ ] No console errors
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing!

## Recognition

Contributors will be recognized in the README.md file.

Thank you for making this project better! 🎉
