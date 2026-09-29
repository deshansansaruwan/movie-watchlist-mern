import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/movies`;

// GET all movies
export const getMovies = () => {
    return axios.get(API_URL);
};

// GET one movie
export const getMovieById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// CREATE movie
export const createMovie = (movieData) => {
    return axios.post(API_URL, movieData);
};

// UPDATE movie
export const updateMovie = (id, movieData) => {
    return axios.put(
        `${API_URL}/${id}`,
        movieData
    );
};

// DELETE movie
export const deleteMovie = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};