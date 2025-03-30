# Real time client presentation editor

## Development Status

Currently in active development.

### Upcoming Features

- Responsive table design
- Locales change all data
- CSV export functionality
- Gallery view alternative
- Enhanced Faker dictionaries for more diverse data generation
- TODO items resolution
- MVC pattern compliance improvements
- Zod validation for environment variables
- Debounce implementation for user inputs
- Auto-scroll reset on user interaction dependencies change

## Live Demo

Visit: [Your deployed app URL]

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
