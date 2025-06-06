# Development & Maintenance Guides

This directory contains practical guides for developing, deploying, and maintaining Dr. Sarah Mitchell's Academic Portfolio.

## 📁 Directory Structure

```
guides/
├── README.md                           # This overview
├── development.md                      # Development setup and workflow
├── deployment.md                       # Deployment procedures
└── maintenance.md                      # Maintenance procedures
```

## 🚀 Quick Start

### For New Developers
1. **[Development Setup](./development.md)** - Get your local environment running
2. **[Project Structure](./development.md#project-structure)** - Understand the codebase
3. **[Development Workflow](./development.md#workflow)** - Learn the development process

### For Deployment
1. **[Deployment Guide](./deployment.md)** - Production deployment steps
2. **[Environment Configuration](./deployment.md#environment)** - Environment variables and settings
3. **[Monitoring](./deployment.md#monitoring)** - Post-deployment monitoring

### For Maintenance
1. **[Maintenance Schedule](./maintenance.md)** - Regular maintenance tasks
2. **[Troubleshooting](./maintenance.md#troubleshooting)** - Common issues and solutions
3. **[Updates](./maintenance.md#updates)** - Keeping the portfolio current

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui + Radix UI
- **Animations:** Framer Motion

### Development Tools
- **Package Manager:** pnpm
- **Testing:** Jest + React Testing Library + Playwright
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript
- **Build Tool:** Next.js built-in

### Deployment & Hosting
- **Platform:** Vercel (recommended)
- **Domain:** Custom domain configuration
- **Analytics:** Vercel Analytics
- **Monitoring:** Vercel Monitoring

## 📋 Common Tasks

### Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

### Content Updates
- **Academic Data:** Edit `data/academic-data.json`
- **Research Projects:** Update `data/research-projects.json`
- **Publications:** Modify `data/publications.json`
- **Teaching:** Update `data/teaching-data.json`

### Design Updates
- **Colors:** Modify CSS variables in `styles/globals.css`
- **Typography:** Update font configurations in `tailwind.config.ts`
- **Components:** Edit components in `components/` directory

## 🔧 Configuration Files

### Key Configuration Files
- **`next.config.mjs`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Dependencies and scripts
- **`components.json`** - Shadcn/ui configuration

### Environment Variables
- **Development:** `.env.local`
- **Production:** Vercel environment variables
- **Testing:** `.env.test`

## 📊 Quality Assurance

### Code Quality
- **TypeScript:** Strict type checking enabled
- **ESLint:** Comprehensive linting rules
- **Prettier:** Consistent code formatting
- **Husky:** Pre-commit hooks for quality checks

### Testing Strategy
- **Unit Tests:** Component and utility testing
- **Integration Tests:** Feature workflow testing
- **E2E Tests:** Complete user journey testing
- **Visual Tests:** Component visual regression testing

### Performance Monitoring
- **Core Web Vitals:** Lighthouse CI integration
- **Bundle Analysis:** Bundle size monitoring
- **Performance Budgets:** Automated performance checks
- **Real User Monitoring:** Vercel Analytics

## 🆘 Support & Resources

### Documentation
- **[Design System](../design-system/README.md)** - Design guidelines and components
- **[Functionality](../functionality/README.md)** - Feature documentation
- **[Project Management](../project-management/README.md)** - Project planning and progress

### External Resources
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styling framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Vercel](https://vercel.com/docs)** - Deployment platform

### Getting Help
1. **Check Documentation** - Start with relevant guide sections
2. **Review Issues** - Check existing GitHub issues
3. **Create Issue** - Document new problems or feature requests
4. **Contact Maintainer** - For urgent issues or questions

---

*These guides are designed to help you work effectively with the academic portfolio. Start with the development guide if you're new to the project.* 