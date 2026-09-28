import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre:{
            type: String,
            required: true,
        },
        year:{
            type: Number,
            required: true,
        },
        rating:{
            type: Number,
            required: true,
        },
        watched:{
            type: Boolean,
            default: false,
        },
    }
);

const Movie = mongoose.model("Movie",movieSchema);

export default Movie;
