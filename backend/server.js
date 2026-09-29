import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';


const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api/movies', movieRoutes);


app.get('/',(req, res) => {
    res.send('Movie API is running in the backend');
});

connectDB();

app.listen(port,() => {
    console.log('server running on port ' + port);
});

app.use(errorMiddleware);
