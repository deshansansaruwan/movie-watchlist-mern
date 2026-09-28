import { useState } from "react";

function AddMovieForm({ onMovieAdded }) {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [watched, setWatched] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    const currentYear = new Date().getFullYear();

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError("");

        // Trim text
        const cleanTitle = title.trim();
        const cleanGenre = genre.trim();

        // Validation
        if (!cleanTitle) {
            setFormError("Movie title is required.");
            return;
        }

        if (!cleanGenre) {
            setFormError("Genre is required.");
            return;
        }

        if (!year) {
            setFormError("Year is required.");
            return;
        }

        const movieYear = Number(year);

        if (
            movieYear < 1888 ||
            movieYear > currentYear
        ) {
            setFormError(
                `Year must be between 1888 and ${currentYear}.`
            );
            return;
        }

        if (!rating) {
            setFormError("Rating is required.");
            return;
        }

        const movieRating = Number(rating);

        if (
            movieRating < 0 ||
            movieRating > 10
        ) {
            setFormError(
                "Rating must be between 0 and 10."
            );
            return;
        }

        const movieData = {
            title: cleanTitle,
            genre: cleanGenre,
            year: movieYear,
            rating: movieRating,
            watched,
        };

        try {
            setSubmitting(true);

            await onMovieAdded(movieData);

            // Clear form after success
            setTitle("");
            setGenre("");
            setYear("");
            setRating("");
            setWatched(false);
            setFormError("");
        } catch (error) {
            // Error is already handled by App
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            className="movie-form"
            onSubmit={handleSubmit}
        >
            <h2>Add New Movie</h2>

            {formError && (
                <div className="form-error">
                    ❌ {formError}
                </div>
            )}

            {/* Title */}

            <label>
                Movie Title
            </label>

            <input
                type="text"
                placeholder="e.g. Interstellar"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                disabled={submitting}
                required
            />

            {/* Genre */}

            <label>
                Genre
            </label>

            <input
                type="text"
                placeholder="e.g. Sci-Fi"
                value={genre}
                onChange={(e) =>
                    setGenre(e.target.value)
                }
                disabled={submitting}
                required
            />

            {/* Year */}

            <label>
                Release Year
            </label>

            <input
                type="number"
                placeholder="e.g. 2014"
                min="1888"
                max={currentYear}
                value={year}
                onChange={(e) =>
                    setYear(e.target.value)
                }
                disabled={submitting}
                required
            />

            {/* Rating */}

            <label>
                Rating
            </label>

            <input
                type="number"
                placeholder="0 - 10"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(e) =>
                    setRating(e.target.value)
                }
                disabled={submitting}
                required
            />

            {/* Watched */}

            <label className="checkbox-label">

                <input
                    type="checkbox"
                    checked={watched}
                    onChange={(e) =>
                        setWatched(e.target.checked)
                    }
                    disabled={submitting}
                />

                Watched

            </label>

            {/* Submit */}

            <button
                type="submit"
                className="primary-button"
                disabled={submitting}
            >
                {submitting
                    ? "Adding..."
                    : "Add Movie"}
            </button>

        </form>
    );
}

export default AddMovieForm;