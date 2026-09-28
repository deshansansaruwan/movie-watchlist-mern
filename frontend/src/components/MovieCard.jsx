import { useState } from "react";

function MovieCard({
    movie,
    onDelete,
    onUpdate,
}) {
    const [isEditing, setIsEditing] =
        useState(false);

    const [title, setTitle] =
        useState(movie.title);

    const [genre, setGenre] =
        useState(movie.genre);

    const [year, setYear] =
        useState(movie.year);

    const [rating, setRating] =
        useState(movie.rating);

    const [watched, setWatched] =
        useState(movie.watched);

    const [saving, setSaving] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [editError, setEditError] =
        useState("");

    const currentYear =
        new Date().getFullYear();

    // =========================
    // Delete
    // =========================

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${movie.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);

            await onDelete(movie._id);
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    // =========================
    // Update
    // =========================

    const handleUpdate = async (e) => {
        e.preventDefault();

        setEditError("");

        const cleanTitle = title.trim();
        const cleanGenre = genre.trim();

        if (!cleanTitle) {
            setEditError(
                "Movie title is required."
            );
            return;
        }

        if (!cleanGenre) {
            setEditError("Genre is required.");
            return;
        }

        const movieYear = Number(year);

        if (
            movieYear < 1888 ||
            movieYear > currentYear
        ) {
            setEditError(
                `Year must be between 1888 and ${currentYear}.`
            );
            return;
        }

        const movieRating = Number(rating);

        if (
            movieRating < 0 ||
            movieRating > 10
        ) {
            setEditError(
                "Rating must be between 0 and 10."
            );
            return;
        }

        const updatedMovie = {
            title: cleanTitle,
            genre: cleanGenre,
            year: movieYear,
            rating: movieRating,
            watched,
        };

        try {
            setSaving(true);

            await onUpdate(
                movie._id,
                updatedMovie
            );

            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // Edit Mode
    // =========================

    if (isEditing) {
        return (
            <form
                className="movie-card edit-form"
                onSubmit={handleUpdate}
            >
                <h3>Edit Movie</h3>

                {editError && (
                    <div className="form-error">
                        ❌ {editError}
                    </div>
                )}

                <label>
                    Movie Title
                </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    disabled={saving}
                    required
                />

                <label>
                    Genre
                </label>

                <input
                    type="text"
                    value={genre}
                    onChange={(e) =>
                        setGenre(e.target.value)
                    }
                    disabled={saving}
                    required
                />

                <label>
                    Year
                </label>

                <input
                    type="number"
                    min="1888"
                    max={currentYear}
                    value={year}
                    onChange={(e) =>
                        setYear(e.target.value)
                    }
                    disabled={saving}
                    required
                />

                <label>
                    Rating
                </label>

                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={rating}
                    onChange={(e) =>
                        setRating(e.target.value)
                    }
                    disabled={saving}
                    required
                />

                <label className="checkbox-label">

                    <input
                        type="checkbox"
                        checked={watched}
                        onChange={(e) =>
                            setWatched(
                                e.target.checked
                            )
                        }
                        disabled={saving}
                    />

                    Watched

                </label>

                <div className="movie-actions">

                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save"}
                    </button>

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            setIsEditing(false)
                        }
                        disabled={saving}
                    >
                        Cancel
                    </button>

                </div>
            </form>
        );
    }

    // =========================
    // Normal Mode
    // =========================

    return (
        <div className="movie-card">

            <h3>{movie.title}</h3>

            <p>
                <strong>Genre:</strong>{" "}
                {movie.genre}
            </p>

            <p>
                <strong>Year:</strong>{" "}
                {movie.year}
            </p>

            <p>
                <strong>Rating:</strong>{" "}
                ⭐ {movie.rating}
            </p>

            <p>
                {movie.watched
                    ? "✅ Watched"
                    : "⭕ Unwatched"}
            </p>

            <div className="movie-actions">

                <button
                    className="edit-button"
                    onClick={() =>
                        setIsEditing(true)
                    }
                    disabled={deleting}
                >
                    Edit
                </button>

                <button
                    className="delete-button"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete"}
                </button>

            </div>

        </div>
    );
}

export default MovieCard;