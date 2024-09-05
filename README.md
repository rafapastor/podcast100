# Podcast100

Podcast100 is a React application that displays the top 100 most popular podcasts, with details for each podcast and individual episodes. It uses **localStorage** to store data, which expires every 24 hours to avoid excessive API calls.

## Features

- **Main View**: Displays a list of the 100 most popular podcasts where you can filter by podcast title or author.
- **Podcast Detail**: Displays the description, author, and episodes of a selected podcast.
- **Episode Detail**: Displays detailed information about an episode and allows you to play it.

## Technologies used

- **React** (with TypeScript)
- **Vite** for fast development and bundling
- **SCSS** for styling
- **Redux** for state management
- **localStorage** for data persistence
- **Sass** for CSS preprocessing

## Project structure

```bash
├── src
│   ├── assets         # Static assets
│   ├── components     # Reusable components of the app
│   ├── pages          # Main application pages (Home, PodcastDetails, EpisodeDetails)
│   ├── services       # Services for API calls
│   ├── store          # Redux configuration (slices and thunks)
│   ├── styles         # SCSS files for styling
│   ├── utils          # Utilities (e.g., localStorage handling)
│   └── main.tsx       # Main entry point of the app
```

## Instalación y Ejecución

### 1. Clone the repository

```bash
git clone https://github.com/your_username/podcast100.git
cd podcast100
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application in development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

This will generate the optimized files in the dist folder.
