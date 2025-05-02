# Social Media App

A modern social media application built with React, Vite, and TailwindCSS.

## Features

- User authentication (login/signup)
- Create and view posts
- Like and comment on posts
- User profiles
- Delete user accounts
- Responsive design

## Tech Stack

- React 19
- Vite
- TailwindCSS
- React Router

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Deployment

### Deploy to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The app will be built and deployed

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
```

## Project Structure

- `/src` - Application source code
  - `/components` - React components
  - `/context` - Global context and state management
  - `/data` - Mock data for the application
  - `/reducers` - Global reducers
  - `/assets` - Static assets like images

## License

MIT
