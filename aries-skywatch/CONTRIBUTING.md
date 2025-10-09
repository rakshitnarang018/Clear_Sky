# Contributing to ARIES ClearSky

Thank you for your interest in contributing to ARIES ClearSky! This document provides guidelines and best practices for contributing.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test thoroughly: `npm run dev` and `npm test`
7. Commit with clear messages: `git commit -m "feat: add new feature"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Open a Pull Request

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Organize with `@/` aliases
- **Formatting**: Run `npm run lint` before committing

### Design System

- **Colors**: Use semantic tokens from `index.css`, never hardcode colors
- **Components**: Build with shadcn/ui, customize via variants
- **Animations**: Keep animations at 60fps, use Framer Motion
- **Accessibility**: Add ARIA labels, keyboard navigation, semantic HTML

### API Integration

- **React Query**: Use for all API calls with proper caching
- **Error Handling**: Always include error states with retry options
- **Loading States**: Show loading indicators with meaningful messages
- **Polling**: Use `usePollingGate` to pause when tab is hidden

### File Organization

```
src/
├── components/       # Reusable UI components
├── pages/           # Route-level components
├── lib/             # Utilities, API, types
├── hooks/           # Custom React hooks
└── index.css        # Design system & global styles
```

## 🧪 Testing

- Write tests for utility functions in `lib/__tests__/`
- Test scoring algorithm changes thoroughly
- Verify accessibility with keyboard navigation
- Check responsive design on mobile, tablet, desktop

## 🎨 Design Contributions

When proposing design changes:

1. Maintain dark-first aesthetic
2. Keep glass morphism and subtle animations
3. Ensure WCAG AA contrast ratios
4. Test in both light and dark modes
5. Preserve IST time display conventions

## 🐛 Bug Reports

Include in bug reports:

- Steps to reproduce
- Expected vs actual behavior
- Browser and OS version
- Console errors or network logs
- Screenshots if visual issue

## ✨ Feature Requests

For new features, consider:

- Does it align with astronomy observation use case?
- Will it work with the existing API endpoints?
- How does it improve user experience?
- Is it accessible and responsive?

## 📋 Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass (`npm test`)
- [ ] No console errors or warnings
- [ ] Design system used (no hardcoded styles)
- [ ] Components are accessible
- [ ] Documentation updated if needed
- [ ] Tested on mobile and desktop
- [ ] Clear commit messages

## 🔄 Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Build process or auxiliary tools

Example: `feat: add wind direction indicator to weather card`

## 📞 Questions?

Feel free to open an issue for:

- Questions about implementation
- Clarification on requirements
- Discussion of architectural decisions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Happy contributing! 🌟🔭
