# Stream-Flix

A modern streaming platform built with Next.js and Tailwind CSS v4.

## Tailwind CSS v4 Setup

This project uses Tailwind CSS v4's new CSS-first configuration approach. Instead of a JavaScript configuration file (`tailwind.config.js`), all theme customization is handled directly in the CSS file.

### Key Features

- **CSS-First Configuration**: All theme variables and customizations are defined in `src/styles/globals.css` using the `@theme` directive.
- **Native CSS Variables**: Theme values are available as CSS variables, making them accessible throughout the application.
- **Custom Utilities**: Added custom button utilities using the `@utility` directive.
- **Dark Mode**: Configured to use a class-based dark mode strategy.
- **OKLCH Color Space**: Using modern color formats for vibrant, wide-gamut colors.

### Installation

```bash
npm install
npm run dev
```

### Key Files

- `src/styles/globals.css` - Contains all Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind CSS v4

### Notes

To update to the actual Tailwind CSS v4 when it's officially released, you'll need to install:

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

## Features

- Browse and watch movies and TV series
- Modern, responsive design
- Admin dashboard for content management
- Search functionality

## License

MIT
