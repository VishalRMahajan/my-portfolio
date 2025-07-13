<h1 align="center">VishalRMahajan's Portfolio</h1>

<p align="center">
  <img src="https://vishalrmahajan.in/VishalRMahajanOgCard.png" alt="Vishal Mahajan Portfolio OG Card" width="600"/>
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,typescript,tailwind" alt="Tech Stack" />
</p>

## What's in this project

- Retro pixel-art inspired portfolio UI
- Animated loading screen
- Responsive design for desktop & mobile
- Dynamic skills, projects, and work experience (edit `src/data.tsx` to update)
- Spotify "Now Playing" integration
- Oneko Cat cursor animation
- Framer Motion transitions
- All configuration in a single data file

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/VishalRMahajan/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory.  
   See `.env.example` for required variables and their format.

4. Start the development server:
   ```bash
   npm run dev
   ```

## File Structure

```
retro-portfolio/
│
├── public/                  # Static assets (images, icons, cursor,video etc.)
│   ├── VishalRMahajanOgCard.png
│   └── ...other assets
│
├── src/
│   ├── app/                 # Next.js App Router pages and layout
│   │   ├── page.tsx         # Main landing page
│   │   └── ...other app pages
│   │
│   ├── components/          # Reusable React components
│   │   ├── hero.tsx         # Hero section
│   │   ├── Footer.tsx       # Footer section
│   │   ├── skills-grid.tsx  # Skills grid display
│   │   ├── projects.tsx     # Projects showcase
│   │   ├── work-experience.tsx # Work experience section
│   │   ├── NowPlayingCard.tsx  # Spotify "Now Playing" widget
│   │   ├── Loading.tsx      # Loading Screen
│   │   └── ...other UI components
│   │
│   ├── data.tsx             # Centralized portfolio data (skills, projects, contact, etc.)
│   └── ...other source files
│
├── .env.example             # Example environment variables for integrations
├── .env                     # Your actual environment variables (not committed)
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
└── ...other config files
```

**Key Files:**

- `src/data.tsx`: All portfolio content and configuration.
- `src/components/`: UI building blocks for each section.
- `src/app/page.tsx`: Main entry point for the portfolio.
- `public/`: Images and static files used in the portfolio.
- `.env.example`: Shows required environment variables for features like Spotify.
