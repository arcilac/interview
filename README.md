🇪🇸 [Español](./README.es.md) | 🇺🇸 English

# Countries Explorer App

A modern, responsive web application for exploring countries around the world. Built with Next.js 15, TypeScript, and featuring advanced search capabilities, lazy loading for performance, and a clean dark/light theme system.

## 🚀 Features

- **Country Exploration**: Browse and search through 250+ countries worldwide
- **Advanced Search**: Fuzzy search with Fuse.js for intelligent country discovery
- **Region Filtering**: Filter countries by continent (Africa, Americas, Asia, Europe, Oceania)
- **Detailed Views**: Comprehensive country information including flags, population, languages, currencies, and border countries
- **Performance Optimized**: Lazy loading implementation for smooth scrolling through large datasets
- **Theme System**: Dark/light mode with system preference detection and Redux state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **URL State Management**: Shareable URLs with search and filter parameters
- **Type Safety**: Full TypeScript implementation with Zod validation for API responses
- **Modern Icons**: Lucide React icon system for consistent UI elements

## 🛠️ Technologies Used

> **⚠️ Architecture Note**: This application implements a comprehensive architecture with Redux, advanced state management, and multiple design patterns. While this demonstrates various technical skills and best practices, it represents over-engineering for a countries listing application. In a production environment, simpler solutions like React's built-in state management might be more appropriate for some use case. This architecture was chosen to showcase technical capabilities for assessment purposes.

### Core Framework

- **Next.js 15** - React framework with App Router [🔗](https://nextjs.org/)
- **TypeScript** - Type safety and better developer experience [🔗](https://www.typescriptlang.org/)
- **React 18** - Component-based UI library [🔗](https://react.dev/)

### State Management & Data Fetching

- **Redux Toolkit** - Global state management for theme preferences and UI state [🔗](https://redux-toolkit.js.org/)
- **TanStack Query (React Query)** - Server state management and caching [🔗](https://tanstack.com/query/latest)
- **Zod** - Runtime type validation and schema definition [🔗](https://zod.dev/)

### Search & Performance

- **Fuse.js** - Fuzzy search implementation for intelligent country matching [🔗](https://fusejs.io/)
- **Lodash/uniqBy** - Specific utility function for array deduplication (imported as individual module to avoid bundling entire Lodash library, reducing final bundle size and improving performance) [🔗](https://lodash.com/)
- **Lazy Loading** - Progressive content loading for optimal performance with large datasets

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework [🔗](https://tailwindcss.com/)
- **Lucide React** - Modern, lightweight icon system [🔗](https://lucide.dev/)
- **Nunito Sans** - Google Fonts integration [🔗](https://fonts.google.com/)
- **Custom CSS Modules** - Component-specific styling
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### API Integration

- **Axios** - HTTP client for REST Countries API with request/response interceptors [🔗](https://axios-http.com/)
- **REST Countries API** - Comprehensive country data source [🔗](https://restcountries.com/)

## 🏗️ Architecture

### Project Structure

```
src/
├── app/                            # Next.js App Router pages
│   ├── layout.tsx                  # Root layout with providers
│   ├── page.tsx                    # Home page (countries list)
│   └── country/                    # Country pages
│       └── [code]/                 # Dynamic country detail pages
├── components/                     # React components (Atomic Design)
│   ├── atoms/                      # Basic UI elements
│   ├── layout/                     # Layout components
│   ├── molecules/                  # Composite components
│   └── organisms/                  # Complex components
├── hooks/                          # Custom React hooks
├── providers/                      # Context providers
├── schema/                         # Zod validation schemas
├── services/                       # API layer
│   └── helpers/                    # Service helper functions
├── store/                          # Redux store configuration
├── styles/                         # CSS files
├── types/                          # TypeScript type definitions
└── utils/                          # Helper functions

```

### Architectural Patterns

#### 1. **Atomic Design Pattern**

The component structure follows Atomic Design principles:

- **Atoms**: Basic UI elements (Loading, ThemeToggle)
- **Molecules**: Composite components (CountryCard, Search, FilterDropdown)
- **Organisms**: Complex components (LazyCountryGrid, Header)
- **Templates**: Page layouts (PageSections)

#### 2. **Layered Architecture**

- **Presentation Layer**: React components with clear separation of concerns
- **Data Layer**: API services with type validation
- **State Management**: Redux for client state, React Query for server state

#### 3. **URL-First Architecture**

- Search parameters and filters are synchronized with URL state
- Enables shareable links and proper browser navigation
- Maintains state across page refreshes

#### 4. **Type-Safe API Layer**

- Zod schemas validate API responses at runtime
- TypeScript types generated from schemas ensure compile-time safety
- Centralized API configuration with Axios

## 🎯 Solution Approach

### Key Design Decisions

1. **Performance Optimization**

   - Implemented lazy loading for progressive rendering of country cards as user scrolls
   - Used React Query for intelligent caching and background updates
   - Debounced search input to minimize API calls
   - Selective imports from Lodash (only `uniqBy` function) to minimize bundle size

2. **User Experience**

   - **Fuzzy search** with Fuse.js for intelligent matching and typo tolerance
   - **Staggered animations** for smooth list loading and visual feedback
   - **Responsive design** with mobile-first approach and touch-friendly interactions
   - **Loading states** and error handling for better user feedback

3. **State Management Strategy**

   - **Redux Toolkit** for global UI state management (theme system, user preferences)
   - **React Query** for server state management and intelligent caching
   - **URL state** for search and filter parameters to enable shareable links
   - **Component-level state** for transient UI interactions

4. **Type Safety**
   - Comprehensive TypeScript implementation
   - Runtime validation with Zod schemas
   - Type-safe API layer with proper error handling

### Technical Challenges Solved

- **Large Dataset Rendering**: Lazy loading prevents performance issues with 250+ countries by progressively loading country cards as they come into view, reducing initial render time and memory usage
- **Search Performance**: Fuzzy search with Fuse.js and optimized indexing for intelligent matching
- **State Synchronization**: URL state management with proper navigation and browser history
- **Theme System**: dark/light mode with system preference detection using Redux
- **Data Validation**: Runtime type safety with Zod schemas for API responses
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints and touch-friendly interactions
- **API Error Handling**: Comprehensive error boundaries and retry mechanisms with Axios interceptors
- **Performance Optimization**: Debounced search, memoized computations, and efficient re-renders
- **Bundle Size Optimization**: Using selective imports (e.g., `lodash/uniqBy`) instead of entire libraries to reduce JavaScript bundle size and improve loading times

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/arcilac/interview
   cd countries-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

No environment variables required - the app uses the public REST Countries API.

### Customization

- **Themes**: Modify theme colors in CSS custom properties
- **Search Configuration**: Adjust Fuse.js options in `useSearch` hook
- **API Endpoints**: Update base URL in `factoryCountries.ts`

## 🚀 Usage

### Basic Navigation

1. **Browse Countries**: Scroll through the lazy-loaded country list
2. **Search**: Use the search bar for fuzzy matching by name, capital, or region
3. **Filter**: Select a region from the dropdown to narrow results
4. **View Details**: Click any country card to see detailed information
5. **Explore Borders**: Click border country buttons to navigate between connected countries

### Advanced Features

- **URL Sharing**: Copy the URL to share specific search results
- **Theme Toggle**: Switch between light and dark modes
- **Responsive**: Works seamlessly on mobile and desktop devices
