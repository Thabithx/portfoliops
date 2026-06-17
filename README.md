# Portfolio

Human-First Engineering Portfolio website with interactive Three.js floating islands, dynamic lanyard badge physics, and service pricing configurator.

## Project Structure

This project is separated into frontend and backend for deployment:

- **frontend/** - Frontend files (HTML, CSS, JS, assets) deployed on Vercel
- **backend/** - Backend API server deployed on Render

## Deployment

### Frontend (Vercel)

1. Deploy the `frontend/` folder to Vercel
2. Update the backend URL in `frontend/src/api-config.js` with your deployed Render URL

### Backend (Render)

1. Deploy the `backend/` folder to Render
2. Set environment variables in Render:
   - `MONGO_URI` (optional, will use JSON file store if not provided)
   - `PORT` (default: 3001)

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
Open `frontend/index.html` in a browser or use a local server.
