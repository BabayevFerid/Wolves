# Wolves Youth Football Club Website

## Overview

This is a full-stack web application for a youth football club called "Wolves" built with React on the frontend and Express.js on the backend. The application is designed as a professional website for a youth football club based in Yeni Günəşli, featuring news, videos, coach profiles, and contact functionality. The application is built in Azerbaijani language and follows modern web development practices.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme (club gold and black theme)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Development**: Hot module replacement with Vite middleware integration

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Zod schemas for runtime validation
- **Database**: PostgreSQL with four main tables:
  - `news` - News articles and updates
  - `coaches` - Coach profiles and information
  - `videos` - Video gallery content
  - `contacts` - Contact form submissions

## Key Components

### Frontend Components
- **Navigation**: Responsive navigation with mobile menu support
- **Hero Section**: Landing page with club branding and call-to-action
- **News System**: News cards with categories and excerpts
- **Coach Profiles**: Coach cards with detailed modal views
- **Video Gallery**: Video thumbnails with play functionality
- **Contact Form**: Form with validation for club inquiries
- **UI Components**: Comprehensive set of reusable UI components from shadcn/ui

### Backend Routes
- `GET /api/news` - Fetch all news articles
- `GET /api/news/:id` - Fetch specific news article
- `GET /api/coaches` - Fetch all coaches
- `GET /api/coaches/:id` - Fetch specific coach
- `GET /api/videos` - Fetch all videos
- `POST /api/contacts` - Submit contact form

### Database Schema
- **News**: Title, content, excerpt, category, image URL, published date
- **Coaches**: Name, position, experience, certificates, description, achievements, main coach flag
- **Videos**: Title, description, thumbnail URL, video URL, category
- **Contacts**: Name, email, phone, child age, message, created date

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express server handles requests and validates input
3. **Database Operations**: Drizzle ORM executes type-safe database queries
4. **Response Handling**: Server returns JSON responses with proper error handling
5. **State Management**: TanStack Query caches responses and manages loading states
6. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Primitive UI components for accessibility
- **react-hook-form**: Form handling and validation
- **zod**: Schema validation
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Development Setup
- Uses Vite development server with HMR
- Integrated Express server with Vite middleware
- Environment variables for database connection
- TypeScript compilation with strict mode

### Build Process
1. Frontend builds to `dist/public` directory using Vite
2. Backend compiles with esbuild to `dist` directory
3. Single deployment package with static file serving

### Production Configuration
- Static file serving from Express
- Database migrations using Drizzle Kit
- Environment-based configuration for database URL

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
- July 02, 2025. Updated social media links with authentic URLs:
  * Instagram: https://www.instagram.com/wolves_fc_azerbaijan
  * Facebook: https://www.facebook.com/canavarlarufk
  * YouTube: https://youtube.com/@wolves_fc_azerbaijan
  * Removed WhatsApp per user request
- July 02, 2025. Fixed hero section text color from gray to black for better visibility
- July 02, 2025. Added target="_blank" to all social media links for external navigation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```