import express from "express";
import { getMovies, addMovie, getMovieById, updateMovie, deleteMovie} from "../controllers/movieController.js";

const router = express.Router();

router.get('/', getMovies);
router.post('/', addMovie);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id',deleteMovie);

export default router;