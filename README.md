# Movie Watchlist App

A full-stack MERN application for managing a personal movie collection. Add, search, update, and delete movies, mark them as watched, and view collection statistics.

## Features

- Add movies with title, genre, release year, rating, and watched status
- View all movies from MongoDB
- Search by movie title or genre
- Update movie details
- Delete movies with confirmation
- Track total, watched, and unwatched movies
- Calculate the average rating
- Show loading, success, and error states
- Validate movie data in the frontend and backend

## Tech Stack

- React 19 and Vite
- Node.js and Express
- MongoDB and Mongoose
- Axios
- JavaScript and CSS

## Architecture

```text
React frontend
    |
    | Axios HTTP requests
    v
Express REST API
    |
    v
Movie controllers and routes
    |
    v
Mongoose model
    |
    v
MongoDB
```

## API Endpoints

Base URL: `http://localhost:5000/api/movies`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/movies` | Get all movies |
| `GET` | `/api/movies/:id` | Get one movie |
| `POST` | `/api/movies` | Create a movie |
| `PUT` | `/api/movies/:id` | Update a movie |
| `DELETE` | `/api/movies/:id` | Delete a movie |

## Movie Data

Each movie has the following shape:

```json
{
  "title": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014,
  "rating": 9,
  "watched": true
}
```

## Validation

The frontend requires a title, genre, release year, and rating. Ratings are limited to `0-10`, and watched status is stored as a boolean.

The backend uses Mongoose validation and requires `title`, `genre`, `year`, and `rating`. The default value for `watched` is `false`.

## Project Structure

```text
Movie Watchlist App/
├── backend/
│   ├── config/db.js
│   ├── controllers/movieController.js
│   ├── middleware/errorMiddleware.js
│   ├── models/Movie.js
│   ├── routes/movieRoutes.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── services/movieService.js
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

## Requirements

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas connection

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/deshansansaruwan/movie-watchlist-mern.git
cd movie-watchlist-mern
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure the backend

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/MovieWatchlist
```

Keep `.env` out of source control.

### 4. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 5. Install frontend dependencies

Open a second terminal and run:

```bash
cd frontend
npm install
```

### 6. Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Validation Commands

Run these commands from the `frontend` directory:

```bash
npm run lint
npm run build
```

## Database

The application uses the `MovieWatchlist` database and the `movies` collection.

## Future Improvements

- User authentication and accounts
- Movie posters and details pages
- Genre filtering and sorting
- Pagination and favorites
- External movie API integration
- Cloud deployment

## Author

**Deshan**

This project was created as a learning and portfolio project for practicing React, REST APIs, Express, MongoDB, Mongoose, Axios, validation, and error handling.
