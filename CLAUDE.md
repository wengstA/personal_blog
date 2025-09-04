# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting

### Development Workflow
- Use `npm run dev` for development with hot reloading
- Run `npm run build` to check for build errors before deployment
- Use `npm run lint` to ensure code quality

## Project Architecture

This is a Next.js 15 personal blog/portfolio website using the App Router architecture with TypeScript, Tailwind CSS, and shadcn/ui components.

### Key Technologies
- **Next.js App Router**: File-system based routing with server components
- **shadcn/ui**: Copy-paste UI component library built on Radix UI and Tailwind CSS
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Animation library for smooth transitions
- **next-themes**: Dark/light mode theming
- **MDX**: Markdown processing for blog content

### Directory Structure
```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider and global components
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog functionality
│   ├── admin/             # Admin interface
│   └── feishu/            # Feishu integration
├── components/
│   ├── ui/                # shadcn/ui components (button, card, tabs, etc.)
│   ├── shared/            # Shared layout components (header, footer)
│   └── theme-provider.tsx # Theme management
├── lib/
│   ├── utils.ts           # Tailwind class utility (cn function)
│   └── mdx.ts             # MDX processing utilities
├── content/               # Blog markdown content
└── public/                # Static assets
```

### Component System
- Uses shadcn/ui component library with New York style preset
- Components are copied to `components/ui/` and can be customized
- All components use TypeScript and follow the `@/` path alias convention
- Tailwind CSS classes are merged using the `cn()` utility from `lib/utils.ts`

### Styling System
- Tailwind CSS with CSS custom properties for theming
- Dark/light mode support through next-themes
- Custom color system defined in tailwind.config.js using HSL values
- CSS variables defined in globals.css for consistent theming

### Path Aliases
Configure in tsconfig.json:
- `@/*` maps to project root
- `@/components` for components
- `@/lib` for utilities
- `@/app` for app router pages

### Content Management
- Blog posts stored as Markdown files in `content/` directory
- MDX processing for rich content with React components
- File-based content management system

### Language & Localization
- Primary language: Chinese (zh-CN)
- Site metadata and content are in Chinese
- Uses Chinese typography and formatting conventions

## Common Development Patterns

### Adding New Pages
Create files in the `app/` directory following App Router conventions:
- `page.tsx` for route pages
- `layout.tsx` for nested layouts
- Use TypeScript with proper typing

### Adding New Components
- UI components go in `components/ui/` (usually from shadcn/ui)
- Shared components go in `components/shared/`
- Use the `cn()` utility for conditional styling
- Follow existing component patterns for consistency

### Styling Guidelines
- Use Tailwind CSS utility classes
- Leverage the custom color system defined in the theme
- Use responsive design patterns (mobile-first)
- Maintain dark/light theme compatibility

### TypeScript Configuration
- Strict mode is disabled for flexibility
- Path aliases configured for cleaner imports
- Next.js types are included automatically