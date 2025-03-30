# Real-time Presentation Editor

## Current Status

In active development

### Implemented Features

- Nickname-based authentication
- Interactive dashboard with navigation
- Presentation viewing mode
- Virtual presentation list with infinite scroll
- Basic presentation profile

### Development Plan

#### Roles and Permissions System

- Creator: full presentation control
- Editor: slide management
- Viewer: presentation viewing

#### Real-time Synchronization

- Instant updates via WebSocket
- Live presentation list
- Change history

#### Slide Editor

- Text blocks with Markdown support
- Graphics elements management:
    - Shapes and colors
    - Images
    - Scaling
- Slide preview and navigation
- Animations and transitions
- PDF export

#### Technical Improvements

- Responsive design with scaling
- MVC architecture optimization
- Zod validation
- User input optimization

## Live Demo

Visit: [https://realtime-presentation.vercel.app]https://realtime-presentation.vercel.app/dashboard

## Getting Started

1. Clone the repository
2. Install dependencies with pnpm
3. Run the development server

## Available Commands

```bash
# Development
pnpm start:dev      # Run with Turbopack
pnpm start          # Start production server
pnpm start:build    # Build with increased memory

# Code Quality
pnpm format         # Format all files
pnpm lint          # Check TypeScript files
pnpm lint:fix      # Fix TypeScript files
pnpm stylelint     # Check styles
pnpm stylelint:fix # Fix styles

# FSD Architecture
pnpm fsd:check    # Check FSD structure
pnpm fsd:watch    # Watch FSD changes
pnpm fsd:cruise   # Generate dependencies graph

# Other
pnpm prepare      # Setup husky
```

## Architecture

The project follows Feature-Sliced Design (FSD) methodology:
- `app` - Application initialization logic
- `pages` - Page components
- `widgets` - Independent and reusable feature blocks
- `features` - User interactions
- `entities` - Business logic
- `shared` - Reusable components and utils

![2025-03-28_05-01-56](https://github.com/user-attachments/assets/7614625e-9efc-4eb6-8342-9f6bfe29cf84)
