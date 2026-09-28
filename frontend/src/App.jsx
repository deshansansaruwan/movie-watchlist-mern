import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";

import {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} from "./services/movieService";

function App() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    // Loading / error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Success message
    const [successMessage, setSuccessMessage] = useState("");

    // =========================
    // Load Movies
    // =========================

    // Load movies when page opens
    useEffect(() => {
        let isMounted = true;

        const loadMovies = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getMovies();

                if (isMounted) {
                    setMovies(response.data);
                }
            } catch (error) {
                console.error("Error loading movies:", error);

                if (isMounted) {
                    setError(
                        error.response?.data?.message ||
                        "Unable to load movies. Please make sure the backend is running."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadMovies();

        return () => {
            isMounted = false;
        };
    }, []);

    // =========================
    // Create Movie
    // =========================

    const handleMovieAdded = async (movieData) => {
        try {
            setError("");
            setSuccessMessage("");

            const response = await createMovie(movieData);

            setMovies((currentMovies) => [
                ...currentMovies,
                response.data,
            ]);

            setSuccessMessage(
                `"${response.data.title}" added successfully!`
            );

            return true;
        } catch (error) {
            console.error("Error creating movie:", error);

            setError(
                error.response?.data?.message ||
                "Unable to add movie. Please try again."
            );

            throw error;
        }
    };

    // =========================
    // Update Movie
    // =========================

    const handleMovieUpdate = async (id, movieData) => {
        try {
            setError("");
            setSuccessMessage("");

            const response = await updateMovie(
                id,
                movieData
            );

            setMovies((currentMovies) =>
                currentMovies.map((movie) =>
                    movie._id === id
                        ? response.data
                        : movie
                )
            );

            setSuccessMessage(
                `"${response.data.title}" updated successfully!`
            );

            return true;
        } catch (error) {
            console.error("Error updating movie:", error);

            setError(
                error.response?.data?.message ||
                "Unable to update movie. Please try again."
            );

            throw error;
        }
    };

    // =========================
    // Delete Movie
    // =========================

    const handleMovieDelete = async (id) => {
        try {
            setError("");
            setSuccessMessage("");

            await deleteMovie(id);

            setMovies((currentMovies) =>
                currentMovies.filter(
                    (movie) => movie._id !== id
                )
            );

            setSuccessMessage(
                "Movie deleted successfully!"
            );
        } catch (error) {
            console.error("Error deleting movie:", error);

            setError(
                error.response?.data?.message ||
                "Unable to delete movie. Please try again."
            );

            throw error;
        }
    };

    // =========================
    // Search
    // =========================

    const filteredMovies = movies.filter((movie) =>
        movie.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
        movie.genre
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // =========================
    // Statistics
    // =========================

    const totalMovies = movies.length;

    const watchedMovies = movies.filter(
        (movie) => movie.watched
    ).length;

    const unwatchedMovies =
        totalMovies - watchedMovies;

    const averageRating =
        totalMovies > 0
            ? (
                  movies.reduce(
                      (total, movie) =>
                          total + Number(movie.rating),
                      0
                  ) / totalMovies
              ).toFixed(1)
            : "0.0";

    // =========================
    // UI
    // =========================

    return (
        <>
            <Navbar />

            <main className="container">

                {/* =========================
                    Hero
                ========================= */}

                <section className="hero">
                    <h2>My Movie Collection</h2>

                    <p>
                        Keep track of movies you want
                        to watch and movies you've
                        already watched.
                    </p>
                </section>

                {/* =========================
                    Global Messages
                ========================= */}

                {successMessage && (
                    <div className="success-message">
                        ✅ {successMessage}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        ❌ {error}

                        <button
                            className="close-message"
                            onClick={() =>
                                setError("")
                            }
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* =========================
                    Statistics
                ========================= */}

                <section className="stats-grid">

                    <div className="stat-card">
                        <span>🎬</span>
                        <h3>{totalMovies}</h3>
                        <p>Total Movies</p>
                    </div>

                    <div className="stat-card">
                        <span>✅</span>
                        <h3>{watchedMovies}</h3>
                        <p>Watched</p>
                    </div>

                    <div className="stat-card">
                        <span>⭕</span>
                        <h3>{unwatchedMovies}</h3>
                        <p>Unwatched</p>
                    </div>

                    <div className="stat-card">
                        <span>⭐</span>
                        <h3>{averageRating}</h3>
                        <p>Average Rating</p>
                    </div>

                </section>

                {/* =========================
                    Add Movie
                ========================= */}

                <AddMovieForm
                    onMovieAdded={handleMovieAdded}
                />

                {/* =========================
                    Movies
                ========================= */}

                <section className="movies-section">

                    <div className="movies-header">

                        <h2>
                            Movies ({filteredMovies.length})
                        </h2>

                        <input
                            className="search-input"
                            type="text"
                            placeholder="🔍 Search movies..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                    {/* Loading */}

                    {loading && (
                        <div className="status-message">
                            <div className="spinner"></div>
                            <p>Loading movies...</p>
                        </div>
                    )}

                    {/* Movies */}

                    {!loading && !error && (
                        <>
                            {filteredMovies.length > 0 ? (
                                <div className="movie-grid">

                                    {filteredMovies.map(
                                        (movie) => (
                                            <MovieCard
                                                key={movie._id}
                                                movie={movie}
                                                onDelete={
                                                    handleMovieDelete
                                                }
                                                onUpdate={
                                                    handleMovieUpdate
                                                }
                                            />
                                        )
                                    )}

                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        🎬
                                    </div>

                                    <h3>
                                        {search
                                            ? "No movies found"
                                            : "No movies yet"}
                                    </h3>

                                    <p>
                                        {search
                                            ? "Try a different search term."
                                            : "Add your first movie using the form above."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                </section>

            </main>
        </>
    );
}

export default App;