import Movie from "../models/Movie.js";

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    }catch (error){
        res.status(500).json({message: error.message,});
        console.error(error);
    }
}

const addMovie = async (req, res) => {
    try {
        const { title, genre, year, rating, watched } = req.body;

        const movie = await Movie.create({
            title,genre,year,rating,watched,
        });

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

const getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({message: "Movie not found",});
            console.error("Movie not found");
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: error.message,});
    }
}

const updateMovie = async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true,}
        );
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);

    } catch (error) {
        res.status(400).json({message: error.message,});
    }
}

const deleteMovie =async(req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if(!movie){
            return res.status(404).json({message: "Movie not found",});
            console.error("Movie not found");
        }
        res.status(200).json({message: "Movie deleted successfully",});
    } catch (error) {
        res.status(500).json({message: error.message,});
        console.error(error);
    }
}

export { getMovies, addMovie, getMovieById, updateMovie, deleteMovie};
